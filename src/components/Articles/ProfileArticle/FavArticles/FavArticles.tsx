import React, { useCallback, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { axiosClient } from 'api/axios-utils';
import { useAppSelector } from 'store/hooks';

import Article from 'components/Articles/ProfileArticle/Article';
import ArticleType from 'types/ArticleType';

// import Loading from '../../../../assets/images/Loading.svg';
import { ErrorMessage } from 'components/UI';
import SkeletonArticle from '../SkeletonArticle';
import useFetchAllArticles from 'hooks/useFetchAllArticles';
import Pagination from 'components/Pagination/Pagination';

function FavArticles() {
  const { token } = useAppSelector((state) => state.auth);

  const { username } = useParams<{ username: string }>();

  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const { allArticles } = useFetchAllArticles(`?favorited=${username}`);

  useEffect(() => {
    setPageCount(allArticles ? Math.ceil(allArticles.length / 10) : 0);
  }, [allArticles]);

  const fetchFavArticles = useCallback(async () => {
    const res = await axiosClient({
      url: `/articles?favorited=${username}`,
      method: 'GET',
      params: {
        limit: 10,
        offset,
      },
      headers: token ? { authorization: `Token ${token}` } : {},
    });
    return res.data.articles as ArticleType[];
  }, [offset, token, username]);

  const {
    data: favArticles,
    isLoading,
    error,
  } = useQuery(['favArticles', username, offset], fetchFavArticles, {
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!username,
  });

  if (isLoading) {
    return (
      <>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <SkeletonArticle key={i} />
          ))}
      </>
    );
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <div className="mb-16 lg:mb-6">
        {favArticles!.length > 0 ? (
          favArticles?.map((article) => <Article key={article?.slug} articleData={article} />)
        ) : (
          <div className="text-3xl font-semibold text-center mt-16">
            No favorited articles found!
          </div>
        )}
      </div>
      {pageCount > 1 && <Pagination pageCount={pageCount} offset={offset} setOffset={setOffset} />}
    </>
  );
}

export default FavArticles;
