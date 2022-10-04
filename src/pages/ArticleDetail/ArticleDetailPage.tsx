import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { axiosClient } from 'api/axios-utils';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setLoading } from 'store/features/loading/loadingSlice';

import {
  ArticleDetail,
  SideArticleDetail,
  SkeletonArticleDetail,
  SkeletonSideArticleDetail,
} from 'components/Articles';
import { CommentModal, ErrorMessage } from 'components/UI';

function ArticleDetailPage() {
  const [showComments, setShowComments] = useState(false);

  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { slug } = useParams<{ slug: string }>();

  const fetchArticleDetail = useCallback(async () => {
    const res = await axiosClient({
      url: `/articles/${slug}`,
      method: 'GET',
      headers: token ? { authorization: `Token ${token}` } : {},
    });
    return res.data.article;
  }, [slug, token]);

  const {
    data: articleDetail,
    error,
    isLoading,
  } = useQuery(['articleDetail', slug], fetchArticleDetail, {
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!slug,
    // onSuccess: () => {
    //   dispatch(setLoading(false));
    // },
    // onError: () => {
    //   dispatch(setLoading(false));
    // },
  });

  // useEffect(() => {
  //   dispatch(setLoading(isLoading));
  // }, [dispatch, isLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div
      className={`${!isAuthenticated ? 'pt-[4.5rem] max-w-[96rem] mx-auto lg:pl-16' : ''} ${
        showComments ? 'overflow-hidden' : ''
      } `}
    >
      <div className={`postlist-container grid grid-cols-3 ${!isAuthenticated && ''}`}>
        {isLoading ? (
          <SkeletonArticleDetail />
        ) : (
          <ArticleDetail
            articleDetail={articleDetail}
            onShowComments={() => setShowComments(true)}
            showComments={showComments}
          />
        )}
        <div className="hidden lg:block col-span-1">
          {isLoading ? (
            <SkeletonSideArticleDetail />
          ) : (
            showComments || <SideArticleDetail authorData={articleDetail?.author} />
          )}
        </div>
        <CommentModal showComments={showComments} setShowComments={setShowComments} slug={slug} />
      </div>
    </div>
  );
}

export default ArticleDetailPage;
