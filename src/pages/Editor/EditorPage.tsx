import { useState, useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './EditorPage.css';

import { useAppSelector, useAppDispatch } from 'store/hooks';
import logoYellow from '../../assets/images/logoYellow.svg';
import fallback from '../../assets/images/blackCat.png';

import { axiosClient } from 'api/axios-utils';
import { setLoading } from 'store/features/loading/loadingSlice';
import { AxiosError } from 'axios';
import ArticleType from 'types/ArticleType';
import { ErrorMessage, LoadingModal, ProfileModal } from 'components/UI';
import { TagItem } from 'components';

type FormValues = {
  title: string;
  description: string;
  body: string;
  tagList: string;
};

function EditorPage() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tagList, setTagList] = useState<string[]>([]);
  const [navClasses, setNavClasses] = useState('');

  const { image, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const setFixedNav = useCallback(() => {
    if (window.scrollY >= 100) {
      setNavClasses(
        'fixed top-0 left-0 w-full z-[1000] px-2 sm:px-6 md:px-10 lg:px-12 bg-gray-500 bg-opacity-50 py-2 shadow-md'
      );
    } else {
      setNavClasses('');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', setFixedNav);
    return () => window.removeEventListener('scroll', setFixedNav);
  }, [setFixedNav]);

  const fetchArticleDetail = useCallback(async () => {
    const res = await axiosClient({
      url: `/articles/${slug}`,
      method: 'GET',
    });
    return res.data.article as ArticleType;
  }, [slug]);

  const {
    data: articleDetail,
    error,
    isLoading,
  } = useQuery(['articleDetail', slug], fetchArticleDetail, {
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!slug,
  });

  useEffect(() => {
    setTagList(articleDetail?.tagList || []);
  }, [articleDetail]);

  const handlePublishArticle = async (values: FormValues) => {
    const { title, description, body, tagList } = values;
    const tagListArray = tagList.split(' ');

    const article = {
      article: {
        title,
        description,
        body,
        tagList: tagListArray,
      },
    };
    try {
      dispatch(setLoading(true));
      const res = await axiosClient({
        url: `/articles/${slug ? slug : ''}`,
        method: slug ? 'PUT' : 'POST',
        data: article,
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const { slug: responseSlug } = res.data.article;
      navigate(`/article/${responseSlug}`);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      const err = error as AxiosError;
      const errorData: any = err.response?.data;
      let errorMessage = 'Create article failed!';
      if (errorData) {
        const { errors } = errorData;
        Object.keys(errors).forEach((key) => {
          errorMessage += ` \n${key} ${errors[key]}`;
        });
      }
      toast.error(errorMessage);
      console.error(err.message);
    }
  };
  console.log(tagList);

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      title: articleDetail?.title || '',
      description: articleDetail?.description || '',
      body: articleDetail?.body || '',
      tagList: articleDetail?.tagList.join(' ') || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title must not be empty!'),
      description: Yup.string().required('Description must not be empty!'),
      body: Yup.string().required('Body must not be empty!'),
      tagList: Yup.string(),
    }),
    onSubmit: (values) => {
      values.tagList = tagList.join(' ');
      handlePublishArticle(values);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <LoadingModal />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="NewArticle-container max-w-[96rem] px-2 sm:px-6 md:px-10 lg:px-12 mx-auto">
      <div
        className={`NewArticle-nav py-3 flex justify-between ${navClasses} transition-all duration-700 ease-out`}
      >
        <div className="left flex items-center">
          <Link to="/home">
            <img src={logoYellow} alt="" className="w-[2.75rem] mr-2" />
          </Link>
          <span className="text-[0.9rem]">Story in THE WORLD</span>
        </div>
        <div className="right flex items-center gap-5">
          <button
            type="submit"
            form="editor-form"
            className="text-[0.8rem] text-white bg-[#1a8917] hover:bg-[#38c234] px-3 py-[0.35rem] rounded-3xl"
          >
            Publish
          </button>

          <i className="fa-regular fa-bell hidden sm:inline-block  text-gray-600 hover:text-black hover:cursor-pointer text-[1rem]"></i>
          <div className="relative">
            <img
              src={image || fallback}
              onError={(e) => {
                e.currentTarget.src = fallback;
              }}
              alt=""
              className="navAvatar rounded-full hover:cursor-pointer w-[50px] h-[50px] object-cover"
              onClick={() => setShowProfileModal(!showProfileModal)}
            />
            {showProfileModal && (
              <ProfileModal onToggleModal={setShowProfileModal} position="top" />
            )}
          </div>
        </div>
      </div>
      <div className="story-description w-[90%] md:w-[70%] mx-auto mt-4 mb-6 flex">
        <i className="hidden md:inline-block fa-solid text-3xl fa-circle-plus border-r border-r-gray-500 pr-3 mr-4"></i>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          id="editor-form"
          className="w-full"
        >
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="text-3xl outline-0 p-2 border-b  mb-3 w-full "
            />
            {formik.errors?.title && formik.touched?.title && (
              <div className="text-red-500 text-sm mb-4">{formik.errors.title}</div>
            )}
          </div>

          <div>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="text-2xl outline-0 p-2 border-b mb-3 w-full "
            />
            {formik.errors?.description && formik.touched?.description && (
              <div className="text-red-500 text-sm mb-4">{formik.errors.description}</div>
            )}
          </div>
          <CKEditor
            editor={ClassicEditor}
            data={formik.values.body}
            onChange={(_event: any, editor: { getData: () => any }) => {
              const data = editor.getData();
              formik.setFieldValue('body', data);
            }}
            onBlur={() => {
              formik.setFieldTouched('body', true);
            }}
          />
          {formik.errors?.body && formik.touched?.body && (
            <div className="text-red-500 text-sm mb-4">{formik.errors.body}</div>
          )}

          <div>
            <input
              type="text"
              name="tagList"
              placeholder="Tag list (separate by space)"
              defaultValue={tagList.join(' ')}
              onChange={(e) => {
                if (e.target.value[e.target.value.length - 1] === ' ') {
                  const tags = e.target.value.split(' ').filter((tag) => tag !== '');

                  setTagList((prev) => tags);
                }
                if (e.target.value === '') {
                  setTagList([]);
                }
              }}
              className="text-xl outline-0 mb-3 p-2 border-b w-full "
            />
          </div>
          <div className="flex gap-x-6 w-full flex-wrap">
            {tagList.map((tag) => (
              <TagItem
                key={tag}
                tag={tag}
                canHide
                closeFn={() => setTagList((prev) => prev.filter((tagItem) => tagItem !== tag))}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditorPage;
