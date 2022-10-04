import React from 'react';
import { Link } from 'react-router-dom';

import fallback from '../../../assets/images/blackCat.png';

import ArticleType from 'types/ArticleType';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import TagItem from 'components/TagItem/TagItem';

const Article: React.FC<{ articleData: ArticleType }> = ({ articleData }) => {
  return (
    <div className="a-article bg-gray-100 shadow-lg my-6  py-6 px-6 rounded-md border-b border-b-gray-300 hover:scale-[1.03] transition-all duration-300 ease-in-out">
      <div className="gr-top flex justify-between items-center">
        <div className="left flex items-center">
          <Link to={`/profile/${articleData?.author?.username}/about`}>
            <LazyLoadImage
              src={articleData?.author?.image || fallback}
              alt="avatar"
              effect="blur"
              className="w-[3rem] h-[3rem] rounded-full mr-3 object-cover"
              onError={(e) => {
                e.currentTarget.src = fallback;
              }}
            />
          </Link>
          <div className="title-date">
            <Link
              to={`/profile/${articleData?.author?.username}/about`}
              className="title text-[#5cb85c] font-medium hover:underline capitalize"
            >
              {articleData?.author?.username}
            </Link>
            <p className="text-[0.75rem] text-gray-500">
              {new Date(articleData?.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <span
          className={`text-sm border ${
            articleData?.favorited
              ? 'text-red-500  border-red-500'
              : 'text-gray-500 border-gray-500'
          }  p-1 rounded-md hover:bg-red-500 hover:border-red-500 hover:text-white hover:cursor-pointer`}
        >
          {articleData?.favorited ? (
            <i className="fa-solid fa-heart animate-pulse"></i>
          ) : (
            <i className="fa-regular fa-heart"></i>
          )}{' '}
          {articleData?.favoritesCount}
        </span>
      </div>
      <Link to={`/article/${articleData?.slug}`} className="gr-middle my-5 block max-w-[80vw]">
        <p className="font-semibold text-xl w-2/3 line-clamp-2 break-words  ">
          {articleData?.title}
        </p>
        <p className="text-md text-[#757575]">{articleData?.description}</p>
      </Link>
      <div className="gr-bot flex justify-between text-sm text-[#757575] items-center">
        <Link to={`/article/${articleData?.slug}`} className="text-[#5cb85c] hover:font-medium">
          Read more...
        </Link>
        <div className="tags flex justify-end gap-x-4 ">
          {articleData?.tagList?.slice(0, 3).map((tag) => (
            <Link key={tag} to={`/article?tag=${tag}`}>
              <TagItem tag={tag} closeFn={() => {}} canHide={false} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Article;
