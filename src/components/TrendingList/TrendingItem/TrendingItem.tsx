import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleType from 'types/ArticleType';

import fallback from '../../../assets/images/blackCat.png';

const TrendingItem: React.FC<{ article: ArticleType; index: number }> = ({ article, index }) => {
  let random = Math.floor(Math.random() * 50) + 1;

  const navigate = useNavigate();
  return (
    <div
      className="item-container flex w-full md:w-[46%] lg:w-[33%] mb-8 transition-all duration-1000 ease-in-out cursor-pointer"
      onClick={() => navigate(`/article/${article?.slug}`)}
    >
      <div className="number-left text-4xl font-semibold text-[#ccc] mr-5 mt-[-0.5rem]">
        {(index + 1).toString().padStart(2, '0')}
      </div>
      <div className="right">
        <div className="ava-title flex">
          <img
            src={article?.author?.image}
            className="rounded mr-2 w-[20px] h-[20px]"
            alt="avatar"
            onError={(e) => (e.currentTarget.src = fallback)}
          />
          <span className="text-sm">
            {article?.author?.username} in {article?.tagList?.[0]}
          </span>
        </div>
        <p className="font-semibold mt-2 mb-[0.6rem]">
          {article?.title.length > 50 ? article?.title.slice(0, 50) + '...' : article?.title}
        </p>
        <div className="time text-sm text-[#757575]">
          <span>{new Date(article?.createdAt).toLocaleDateString()}</span>
          <span> - </span>
          <span>{random} min read</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingItem;
