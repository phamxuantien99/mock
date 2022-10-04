import { axiosClient } from 'api/axios-utils';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './ArticleDetail.css';

import { useAppDispatch, useAppSelector } from 'store/hooks';

import fallback from '../../../assets/images/blackCat.png';

import ArticleType from 'types/ArticleType';

import convertDate from 'utils/convertDate';
import { ConfirmModal } from 'components/UI';
import { setLoading } from 'store/features/loading/loadingSlice';
import ProfileTooltip from 'components/UI/Tooltip/ProfileTooltip';

const ArticleDetail: React.FC<{
  articleDetail: ArticleType | undefined;
  onShowComments: () => void;
  showComments: boolean;
}> = ({ articleDetail, onShowComments, showComments }) => {
  const random = Math.floor(Math.random() * 30) + 1;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeletingArticle, setIsDeletingArticle] = useState(false);
  const [isFavorited, setIsFavorited] = useState(articleDetail?.favorited);
  const [favorCount, setFavorCount] = useState(articleDetail?.favoritesCount);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { token, isAuthenticated, username } = useAppSelector((state) => state.auth);

  const handleUnfavorite = async () => {
    try {
      setIsFavorited(false);
      setFavorCount(favorCount! - 1);
      await axiosClient({
        method: 'DELETE',
        url: `/articles/${articleDetail?.slug}/favorite`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
    } catch (err) {
      setIsFavorited(true);
      setFavorCount(favorCount! + 1);
      toast.error('Something went wrong!');
      console.error(err);
    }
  };

  const handleFavorite = async () => {
    try {
      setIsFavorited(true);
      setFavorCount(favorCount! + 1);
      await axiosClient({
        method: 'POST',
        url: `/articles/${articleDetail?.slug}/favorite`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
    } catch (err) {
      setIsFavorited(false);
      setFavorCount(favorCount! - 1);
      toast.error('Something went wrong!');
      console.error(err);
    }
  };

  const handleDeleteArticle = async () => {
    setIsDeletingArticle(true);
    try {
      await axiosClient({
        method: 'DELETE',
        url: `/articles/${articleDetail?.slug}`,

        headers: {
          authorization: `Token ${token}`,
        },
      });
      navigate('/');
      setIsDeletingArticle(false);
    } catch (err) {
      setIsDeletingArticle(false);
      toast.error('Something went wrong, please try again later!');
      console.error(err);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    isDeletingArticle ? dispatch(setLoading(true)) : dispatch(setLoading(false));
  }, [isDeletingArticle, dispatch]);

  return (
    <div
      className={`col-span-3 lg:col-span-2 flex flex-col left-content pt-12 mx-auto ${
        !showComments && 'lg:border-r'
      } border-r-grey-500  pb-16 lg:pb-0 ${
        isAuthenticated ? 'lg:pl-0' : 'pl-8 sm:pl-14'
      } pr-8 sm:pr-14 lg:pr-16 2xl:pr-24 2xl:pl-[76px] min-h-screen w-full break-words`}
    >
      <ConfirmModal
        target="article"
        toggleConfirmModal={showConfirmModal}
        onCancelDelete={handleCancelDelete}
        onConfirmDelete={handleDeleteArticle}
      />
      <div className="pb-8">
        <div className="user-name flex justify-between items-center ">
          <span className="flex gap-2">
            <ProfileTooltip author={articleDetail?.author!}>
              <LazyLoadImage
                src={`${articleDetail?.author?.image}` || fallback}
                onError={(e) => {
                  e.currentTarget.src = fallback;
                }}
                className="rounded-full w-[50px] h-[50px] cursor-pointer object-cover"
                alt="avatar"
                effect="blur"
                onClick={() => navigate(`/profile/${articleDetail?.author?.username}/about`)}
              />
            </ProfileTooltip>

            <div className="flex flex-col">
              <span className="px-2 capitalize text-lg font-semibold">
                {articleDetail?.author?.username}
              </span>
              <span>
                <span className="pl-2 pr-1 text-sm">
                  {convertDate(new Date(articleDetail?.createdAt!))}
                </span>
                <span className="hidden md:inline-block text-sm"> - {random} minutes read</span>
              </span>
            </div>
          </span>
          {username === articleDetail?.author?.username && (
            <div className="text-2xl font-semibold">
              <Link to={`/editor/${articleDetail?.slug}`} className="mr-6">
                <i className="fa-regular fa-pen-to-square cursor-pointer hover:text-green-500 animate-bounce"></i>
              </Link>
              <i
                className="fa-regular fa-trash-can cursor-pointer hover:text-red-500 animate-bounce"
                onClick={() => setShowConfirmModal(true)}
              ></i>
            </div>
          )}
        </div>

        <div className="content flex items-center justify-between mt-2 ">
          {
            <div className="text-content w-full">
              <p className="main-title text-xl sm:text-3xl font-bold my-5 capitalize break-words">
                {articleDetail?.title}
              </p>

              <LazyLoadImage
                className="w-full"
                src={`https://picsum.photos/1000?random=${Math.floor(Math.random() * 50) + 1}`}
                effect="blur"
                alt=""
              />

              <div className="text-center p-2 text-sm text-[#ababab]">
                Random photo on{' '}
                <a href="https://picsum.photos/" target="blank" className="underline">
                  Picsum Photos
                </a>
              </div>
              <div className="main-content pb-6">{parse(`${articleDetail?.body}`)}</div>
            </div>
          }
        </div>
        <div className="some-info flex justify-between mt-3 sm:mt-7 items-center">
          <div className="left flex">
            <div className="pr-7 flex items-center gap-1 ">
              {isFavorited ? (
                <i
                  className="fa-solid fa-heart text-2xl text-red-500 cursor-pointer animate-pulse"
                  onClick={() => {
                    isAuthenticated && handleUnfavorite();
                  }}
                ></i>
              ) : (
                <i
                  className="fa-regular fa-heart text-2xl cursor-pointer hover:text-red-500 animate-pulse"
                  onClick={() => {
                    isAuthenticated ? handleFavorite() : navigate('/login');
                  }}
                ></i>
              )}

              <span className="text-sm">{favorCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <i
                className="fa-regular fa-comment text-2xl cursor-pointer hover:text-blue-500 animate-pulse"
                onClick={onShowComments}
              ></i>
            </div>
          </div>
          <div className="right flex justify-end items-center gap-2 basis-1/2 w-1/2 flex-wrap">
            {articleDetail?.tagList?.map((tag) => (
              <Link
                to={`/article/?tag=${tag}`}
                key={tag}
                className="px-2 py-[0.3rem] bg-[#f2f2f2] rounded-xl mr-3 text-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
