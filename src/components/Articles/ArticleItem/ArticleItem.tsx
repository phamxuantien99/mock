import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { axiosClient } from 'api/axios-utils';
import { useAppSelector } from 'store/hooks';

import fallback from '../../../assets/images/blackCat.png';
import placeholder from '../../../assets/images/120.png';

import ArticleType from 'types/ArticleType';
import convertDate from 'utils/convertDate';
import ProfileTooltip from 'components/UI/Tooltip/ProfileTooltip';

const ArticleItem: React.FC<{ article: ArticleType }> = ({ article }) => {
  let random = Math.floor(Math.random() * 50) + 1;

  const navigate = useNavigate();

  const [isFavorited, setIsFavorited] = useState(article?.favorited);

  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  const handleUnfavorite = async () => {
    try {
      setIsFavorited(false);
      await axiosClient({
        method: 'DELETE',
        url: `/articles/${article?.slug}/favorite`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
    } catch (err) {
      setIsFavorited(true);
      toast.error('Something went wrong!');
      console.error(err);
    }
  };

  const handleFavorite = async () => {
    try {
      setIsFavorited(true);
      await axiosClient({
        method: 'POST',
        url: `/articles/${article?.slug}/favorite`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
    } catch (err) {
      setIsFavorited(false);
      toast.error('Something went wrong!');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col left-content mt-12">
      <div className="border-b-[1px] border-b-[#e6e6e6] pb-8 ">
        <div className="user-name flex items-center ">
          {
            <ProfileTooltip author={article?.author}>
              <LazyLoadImage
                src={`${article?.author?.image}` || fallback}
                onError={(e) => {
                  e.currentTarget.src = fallback;
                }}
                className="rounded-full w-[50px] h-[50px] cursor-pointer object-cover"
                alt="avatar"
                onClick={() => navigate(`/profile/${article?.author?.username}/about`)}
              />
            </ProfileTooltip>
          }
          <span
            className="pl-2 font-medium capitalize cursor-pointer"
            onClick={() => navigate(`/profile/${article?.author?.username}/about`)}
          >
            {article?.author?.username}
          </span>
          <span className="text-[#8b7575] px-2">-</span>
          <span className="text-[#8b7575]">{convertDate(new Date(article?.createdAt))}</span>
        </div>
        <Link
          to={`/article/${article.slug}`}
          className="content flex items-center justify-between gap-4 mt-2 "
        >
          <div className="text-content basis-2/3 w-2/3">
            <div className="main-title text-xl sm:text-2xl font-bold break-words line-clamp-2 ">
              {article?.title}
            </div>
            <div className="main-content hidden sm:block">{article?.description}</div>
          </div>

          {(
            <LazyLoadImage
              src={`https://picsum.photos/120?random=${random}`}
              className="w-[70px] sm:w-[120px]"
              alt=""
              effect="blur"
              placeholderSrc={placeholder}
            />
          ) || (
            <LazyLoadImage
              src={`https://picsum.photos/120`}
              className=" w-[70px] sm:w-[120px]"
              alt=""
              effect="blur"
              placeholderSrc={placeholder}
            />
          )}
        </Link>
        <div className="some-info flex justify-between mt-3 sm:mt-7 items-center">
          <div className="left flex items-center w-1/2 line-clamp-1">
            {article?.tagList?.slice(0, 2).map((tag) => (
              <Link
                to={`/article?tag=${tag}`}
                key={tag}
                className="px-2 py-[0.25rem] bg-gray-200 rounded-xl mr-3 text-sm"
              >
                {tag}
              </Link>
            ))}
            <span className="text-[#8b7575] hidden sm:inline">{random} min read</span>
          </div>

          {isAuthenticated &&
            (isFavorited ? (
              <i
                className="fa-solid fa-heart pr-5 text-xl hover:cursor-pointer text-red-700 animate-pulse"
                onClick={handleUnfavorite}
              ></i>
            ) : (
              <i
                className="fa-regular fa-heart pr-5 text-xl hover:cursor-pointer hover:text-red-700 animate-pulse"
                onClick={handleFavorite}
              ></i>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
