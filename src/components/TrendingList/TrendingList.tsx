import React from 'react';

import ArticleType from 'types/ArticleType';

import TrendingItem from './TrendingItem/TrendingItem';

const TrendingList: React.FC<{ articles: ArticleType[] | undefined }> = ({ articles }) => {
  return (
    <div className="pt-10 pb-4 border-b-[1px] border-b-[#e6e6e6] ">
      <div className="mx-auto w-[88%] max-w-[96rem] 2xl:px-32">
        <div className="trending-title mb-4">
          <i className="fa-solid fa-explosion text-xl mr-2"></i>
          <span className="font-semibold">TRENDING ON PREMIUM</span>
        </div>
        <div className="trending-items flex flex-wrap justify-around">
          {articles?.map((article, index) => (
            <TrendingItem key={article?.slug} article={article} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingList;
