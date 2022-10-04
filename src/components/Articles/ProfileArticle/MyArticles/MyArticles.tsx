import { useCallback, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { axiosClient } from 'api/axios-utils';
import { useAppSelector } from 'store/hooks';

import SkeletonArticle from '../SkeletonArticle';
import Article from 'components/Articles/ProfileArticle/Article';
import Pagination from 'components/Pagination/Pagination';
import { ErrorMessage } from 'components/UI';

import ArticleType from 'types/ArticleType';
import useFetchAllArticles from 'hooks/useFetchAllArticles';

// import Loading from '../../../../assets/images/Loading.svg';

function MyArticles() {
  const { token } = useAppSelector((state) => state.auth);

  const { username } = useParams<{ username: string }>();

  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const { allArticles } = useFetchAllArticles(`?author=${username}`);

  useEffect(() => {
    setPageCount(allArticles ? Math.ceil(allArticles.length / 10) : 0);
  }, [allArticles]);

  const fetchOwnedArticles = useCallback(async () => {
    const res = await axiosClient({
      url: `/articles?author=${username}`,
      method: 'GET',
      params: {
        limit: 10,
        offset,
      },
      headers: token ? { authorization: `Token ${token}` } : {},
    });
    return res.data.articles as ArticleType[];
  }, [token, username, offset]);

  const {
    data: ownedArticles,
    isLoading,
    error,
  } = useQuery(['ownedArticles', username, offset], fetchOwnedArticles, {
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
        {ownedArticles!.length > 0 ? (
          ownedArticles?.map((article) => <Article key={article?.slug} articleData={article} />)
        ) : (
          <div className="text-3xl font-semibold text-center mt-16">No articles found!</div>
        )}
      </div>
      {pageCount > 1 && <Pagination pageCount={pageCount} offset={offset} setOffset={setOffset} />}
    </>
  );
}

export default MyArticles;
