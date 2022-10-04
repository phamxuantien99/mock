import React, { useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import fallback from '../../../../assets/images/blackCat.png';
import Loading from '../../../../assets/images/Loading.svg';

import { axiosClient } from 'api/axios-utils';
import { useAppSelector } from 'store/hooks';
import ArticleType from 'types/ArticleType';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type authorData = {
  username: string;
  image: string;
  bio: string;
  following: boolean;
};

const SideArticleDetail: React.FC<{ authorData: authorData }> = ({ authorData }) => {
  const [isFollowing, setIsFollowing] = useState(authorData.following);

  const { isAuthenticated, username, token } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const { slug } = useParams();

  const fetchOwnedArticles = useCallback(async () => {
    const res = await axiosClient({
      url: `/articles?author=${authorData?.username}`,
      method: 'GET',
      headers: token ? { authorization: `Token ${token}` } : {},
    });
    return res.data.articles as ArticleType[];
  }, [authorData?.username, token]);

  const {
    data: ownedArticles,
    isLoading: isLoadingArticles,
    error,
  } = useQuery(['ownedArticles', authorData?.username], fetchOwnedArticles, {
    refetchOnWindowFocus: false,
    enabled: !!authorData?.username,
  });

  const handleFollowUser = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      setIsFollowing(true);
      await axiosClient({
        url: `/profiles/${authorData?.username}/follow`,
        method: 'POST',
        headers: { authorization: `Token ${token}` },
      });
    } catch (error) {
      setIsFollowing(false);
      toast.error('Something went wrong!');
      console.log(error);
    }
  };

  const handleUnfollowUser = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      setIsFollowing(false);
      await axiosClient({
        url: `/profiles/${authorData?.username}/follow`,
        method: 'DELETE',
        headers: { authorization: `Token ${token}` },
      });
    } catch (error) {
      setIsFollowing(true);
      toast.error('Something went wrong!');
      console.log(error);
    }
  };

  return (
    <div className={`right-content px-8 sticky  ${isAuthenticated ? 'top-5' : 'top-[3.5rem]'}`}>
      <div className="flex justify-between items-center">
        <Link
          to="/editor"
          className=" text-center border border-black rounded-2xl w-full px-3 py-[0.5rem] my-7 text-[#ffc017] bg-black text-md hover:cursor-pointer hover:bg-[#222]"
        >
          Get Started
        </Link>
      </div>
      <div className="search flex items-center border focus-within:border-black rounded-2xl px-3 py-[0.5rem]">
        <i className="fa-solid fa-magnifying-glass mr-2"></i>
        <input type="text" placeholder="Search" className="outline-0 w-full" />
      </div>

      <div className="pt-9 ">
        <LazyLoadImage
          src={authorData?.image || fallback}
          onError={(e) => {
            e.currentTarget.src = fallback;
          }}
          className="rounded-full w-[100px] h-[100px] cursor-pointer object-cover"
          alt="avatar"
          effect="blur"
          onClick={() => navigate(`/profile/${authorData?.username}/about`)}
        />
      </div>
      <Link
        to={`/profile/${authorData?.username}/about`}
        className="inline-block pt-2 capitalize font-semibold text-lg cursor-pointer hover:underline"
      >
        {authorData?.username}
      </Link>
      <div className="py-1">{(Math.random() * 50 + 1).toFixed(1)}K Followers</div>
      <p className="pt-1 truncate">{authorData?.bio}</p>

      <div className="tag pt-5 text-white">
        <button
          className={`inline-block rounded-full px-5 py-2 ${
            isFollowing
              ? 'border border-[#198917] text-[#198917] hover:bg-[#198917] hover:text-white'
              : 'bg-[#198917] hover:bg-[#28ac26]'
          }`}
          onClick={() => {
            if (authorData?.username === username) {
              navigate(`/profile/${authorData?.username}/about`);
            } else if (!isFollowing) {
              handleFollowUser();
            } else {
              handleUnfollowUser();
            }
          }}
        >
          {authorData?.username === username
            ? 'View Profile'
            : isFollowing
            ? 'Following'
            : 'Follow'}
        </button>
      </div>
      <h3 className="mt-6 mb-2 ">
        More from <span className="capitalize font-medium ">{authorData?.username}</span>
      </h3>
      {error ? (
        <p>Something went wrong</p>
      ) : isLoadingArticles ? (
        <>
          <div className="flex justify-between py-5">
            <div>
              <div className="flex items-center">
                <Skeleton className="w-[30px] h-[30px] rounded-full" />
                <Skeleton className="ml-2 w-[70px] h-[20px]" />
              </div>
              <Skeleton className="w-[200px] h-[30px]" />
            </div>
            <Skeleton className="w-[70px] h-[70px] ml-2" />
          </div>
          <div className="flex justify-between py-5">
            <div>
              <div className="flex items-center">
                <Skeleton className="w-[30px] h-[30px] rounded-full" />
                <Skeleton className="ml-2 w-[70px] h-[20px]" />
              </div>
              <Skeleton className="w-[200px] h-[30px]" />
            </div>
            <Skeleton className="w-[70px] h-[70px] ml-2" />
          </div>
          <div className="flex justify-between py-5">
            <div>
              <div className="flex items-center">
                <Skeleton className="w-[30px] h-[30px] rounded-full" />
                <Skeleton className="ml-2 w-[70px] h-[20px]" />
              </div>
              <Skeleton className="w-[200px] h-[30px]" />
            </div>
            <Skeleton className="w-[70px] h-[70px] ml-2" />
          </div>
        </>
      ) : ownedArticles?.length === 0 ? (
        <img src={Loading} alt="" className="ml-8 h-[3rem]" />
      ) : (
        ownedArticles
          ?.filter((article) => article.slug !== slug)
          .slice(0, 4)
          .map((article) => (
            <Link
              to={`/article/${article.slug}`}
              key={article.slug}
              className="flex justify-between py-5"
            >
              <div className="basis-2/3">
                <div className="flex items-center">
                  <LazyLoadImage
                    src={article.author.image || fallback}
                    effect="blur"
                    onError={(e) => {
                      e.currentTarget.src = fallback;
                    }}
                    alt="avatar"
                    className="w-[30px] h-[30px] rounded-full object-cover"
                  />
                  <p className="pl-2 capitalize text-sm">{article?.author?.username}</p>
                </div>
                <p className="py-2 text-black font-bold">{article?.title}</p>
              </div>
              <LazyLoadImage
                src={`https://picsum.photos/70?random=${Math.floor(Math.random() * 50) + 1}`}
                alt="image"
                effect="blur"
                className="w-[70px] h-[70px] ml-2"
              />
            </Link>
          ))
      )}

      <div className="reading-tags flex flex-wrap py-3 gap-4 text-xs text-[#757575]">
        <Link to="" className="hover:text-gray-800">
          Help
        </Link>
        <Link to="" className="hover:text-gray-800">
          Status
        </Link>
        <Link to="" className="hover:text-gray-800">
          Writers
        </Link>
        <Link to="" className="hover:text-gray-800">
          Blog
        </Link>
        <Link to="" className="hover:text-gray-800">
          Careers
        </Link>
        <Link to="" className="hover:text-gray-800">
          Privacy
        </Link>
        <Link to="" className="hover:text-gray-800">
          Terms
        </Link>
        <Link to="" className="hover:text-gray-800">
          About
        </Link>
      </div>
    </div>
  );
};

export default SideArticleDetail;
