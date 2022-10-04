import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { axiosClient } from 'api/axios-utils';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setLoading } from 'store/features/loading/loadingSlice';

import ArticleType from 'types/ArticleType';

import { TagItem, TrendingList } from 'components/';
import { Hero, SideContent } from 'components/Layout';
import { ArticleItem, SkeletonArticleItem } from 'components/Articles/';
import { ErrorMessage } from 'components/UI';
import Pagination from 'components/Pagination/Pagination';

function HomePage() {
  const [feed, setFeed] = useState<'your_feed' | 'global_feed'>('global_feed');
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [filter, setFilter] = useState('');

  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const tagParam = searchParams.get('tag');

  const fetchAllArticles = async () => {
    const res = await axiosClient({
      url: `/articles/${feed === 'your_feed' ? 'feed' : ''}`,
      method: 'GET',
      params: {
        tag: tagParam,
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
    ['allArticles', feed, tagParam, authState.isAuthenticated],
    fetchAllArticles,
    {
      refetchOnWindowFocus: false,
      retry: 2,
      enabled: !!authState.isAuthenticated,
    }
  );

  const fetchArticles = async (offset: number) => {
    const res = await axiosClient({
      url: `/articles/${feed === 'your_feed' ? 'feed' : ''}`,
      method: 'GET',
      params: {
        tag: tagParam,
        limit: 10,
        offset,
      },
      headers: authState.isAuthenticated
        ? {
            Authorization: `Token ${authState.token}`,
          }
        : {},
    });
    return res.data.articles as ArticleType[];
  };

  const {
    data: articlesData,
    isLoading,
    error,
  } = useQuery(
    [['articles', offset], feed, authState.isAuthenticated, tagParam, offset],
    fetchArticles.bind(null, offset),
    {
      refetchOnWindowFocus: false,
      retry: 2,
      onSettled: () => {
        dispatch(setLoading(false));
      },
    }
  );

  useEffect(() => {
    setPageCount(allArticles ? Math.ceil(allArticles.length / 10) : 0);
  }, [allArticles, offset]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div>
      {!authState.isAuthenticated && <Hero />}
      {!authState.isAuthenticated && <TrendingList articles={articlesData} />}
      <div
        className={`max-w-[96rem] mx-auto postlist-container grid grid-cols-3 ${
          !authState.isAuthenticated && 'lg:pl-[5rem] pl-12'
        }`}
      >
        <div className="min-h-screen col-span-3 lg:col-span-2 border-r-[1px] border-r-[#e6e6e6] pr-8 sm:pr-14 lg:pr-[4.5rem] 2xl:ml-10">
          {authState.isAuthenticated && (
            <div className="border-b pb-2 border-gray-300 mt-9">
              <span
                className={`cursor-pointer mr-6 pb-[0.65rem] hover:text-[#c2992a] hover:border-[#c2992a] ${
                  feed === 'global_feed' && 'border-b-2 border-[#ffc017] text-[#ffc017]'
                }`}
                onClick={() => {
                  setFeed('global_feed');
                  setOffset(0);
                }}
              >
                Global Feed
              </span>
              {tagParam ? null : (
                <span
                  className={`cursor-pointer pb-[0.65rem] hover:text-[#c2992a] hover:border-[#c2992a] ${
                    feed === 'your_feed' && 'border-b-2 border-[#ffc017] text-[#ffc017]'
                  }`}
                  onClick={() => {
                    setFeed('your_feed');
                    setOffset(0);
                  }}
                >
                  My Feed
                </span>
              )}
            </div>
          )}
          <div className="content-container flex flex-col pb-8">
            <div className="flex justify-between mt-2">
              {tagParam && <TagItem tag={tagParam} closeFn={() => navigate('/article')} canHide />}
              <select
                onChange={(e) => setFilter(e.target.value)}
                className="
              border border-gray-300 rounded-sm text-sm px-2 py-1 "
              >
                <option value="">Sort by...</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="most-liked">Most Liked</option>
              </select>
            </div>
            {articlesData?.length === 0 ? (
              <div className="h-[70vh] flex">
                <span className="m-auto text-4xl font-bold">
                  No feed article found! <i className="fa-regular fa-face-sad-tear"></i>
                </span>
              </div>
            ) : (
              <>
                {isLoading
                  ? Array(3)
                      .fill(0)
                      .map((_, index) => <SkeletonArticleItem key={index} />)
                  : articlesData
                      ?.sort((a, b) => {
                        if (filter === 'newest') {
                          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                        } else if (filter === 'oldest') {
                          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                        } else if (filter === 'most-liked') {
                          return b.favoritesCount - a.favoritesCount;
                        } else {
                          return 0;
                        }
                      })
                      .map((article) => <ArticleItem key={article.slug} article={article} />)}
              </>
            )}
          </div>
          {pageCount > 1 && (
            <Pagination pageCount={pageCount} offset={offset} setOffset={setOffset} />
          )}
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <SideContent />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
