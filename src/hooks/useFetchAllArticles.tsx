import { useQuery } from 'react-query';
import ArticleType from 'types/ArticleType';
import { axiosClient } from 'api/axios-utils';
import { useAppSelector } from 'store/hooks';

const useFetchAllArticles = (params: string) => {
  const authState = useAppSelector((state) => state.auth);

  const fetchAllArticles = async () => {
    const res = await axiosClient({
      url: `/articles${params}`,
      method: 'GET',
      params: {
        limit: 1000,
      },
      headers: authState.isAuthenticated
        ? {
            Authorization: `Token ${authState.token}`,
          }
        : {},
    });
    return res.data.articles as ArticleType[];
  };

  const { data: allArticles } = useQuery(
    ['allArticles', params, authState.isAuthenticated],
    fetchAllArticles,
    {
      refetchOnWindowFocus: false,
      retry: 2,
      enabled: !!authState.isAuthenticated,
    }
  );

  return { allArticles };
};

export default useFetchAllArticles;
