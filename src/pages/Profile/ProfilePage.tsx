import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { NavLink, Link, useParams, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import fallback from '../../assets/images/blackCat.png';

import { axiosClient } from 'api/axios-utils';
import { useAppSelector } from 'store/hooks';

import ProfileType from 'types/ProfileType';

import { About, SkeletonAbout } from 'components';
import { MyArticles, FavArticles } from 'components/Articles';
import { ErrorMessage } from 'components/UI';

function ProfilePage() {
  const { username, isAuthenticated, token } = useAppSelector((state) => state.auth);

  const { username: usernameParam } = useParams();
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    const res = await axiosClient({
      url: `/profiles/${usernameParam}`,
      method: 'GET',
      headers: token ? { authorization: `Token ${token}` } : {},
    });
    return res.data.profile as ProfileType;
  };

  const [isFollowing, setIsFollowing] = useState(false);

  const {
    data: userProfile,
    isLoading,
    error,
    refetch,
  } = useQuery(['profile', usernameParam], fetchUserProfile, {
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!usernameParam,
    onSuccess: (data) => setIsFollowing(data.following),
  });

  const handleFollowUser = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      setIsFollowing(true);
      await axiosClient({
        url: `/profiles/${userProfile?.username}/follow`,
        method: 'POST',
        headers: { authorization: `Token ${token}` },
      });
      refetch();
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
        url: `/profiles/${userProfile?.username}/follow`,
        method: 'DELETE',
        headers: { authorization: `Token ${token}` },
      });
      refetch();
    } catch (error) {
      setIsFollowing(true);
      toast.error('Something went wrong!');
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div
      className={`${
        isAuthenticated
          ? 'pt-10 pr-6 sm:pr-14 md:pr-[3.5rem] lg:pr-[6rem] sm:ml-0 2xl:ml-9'
          : 'pt-20 px-8 md:px-20 2xl:px-32'
      } max-w-[96rem] mx-auto transition-all duration-700 ease-in-out`}
    >
      {isLoading ? (
        <div className="ava-name-edit flex items-center gap-3">
          <Skeleton className="rounded-full w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] xl:w-[80px] xl:h-[80px]" />
          <div className="flex flex-col justify-end xl:gap-2">
            <Skeleton className="w-[100px] h-[25px]" />

            <Skeleton className="w-[50px] h-[20px]" />
          </div>
        </div>
      ) : (
        <div className="ava-name-edit flex items-center gap-3">
          <img
            src={userProfile?.image! || fallback}
            className="rounded-full object-cover p-1 inline w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] xl:w-[80px] xl:h-[80px]"
            alt="avatar"
            onError={(e) => (e.currentTarget.src = fallback)}
          />
          <div className="flex flex-col justify-end items-start xl:gap-2">
            <p className="font-semibold text-lg xl:text-3xl capitalize">{userProfile?.username}</p>
            {userProfile?.username === username ? (
              <Link
                to={`/profile/${username}/settings`}
                className="edit text-sm text-gray-500 rounded hover:text-green-700"
              >
                <i className="fa-solid fa-gear mr-1"></i>
                <span>Edit Profile</span>
              </Link>
            ) : (
              <button
                className=" text-sm  text-gray-500 hover:text-green-500 "
                onClick={() => {
                  if (isFollowing) {
                    handleUnfollowUser();
                  } else {
                    handleFollowUser();
                  }
                }}
              >
                {isFollowing ? (
                  <i className="fa-solid fa-heart mr-1 text-red-500"></i>
                ) : (
                  <i className="fa-solid fa-user-plus mr-1"></i>
                )}
                <span>{isFollowing ? 'Following' : 'Follow'}</span>
              </button>
            )}
          </div>
        </div>
      )}
      <div className="about-article-fv mt-8 border-b border-b-gray-400 pb-2 text-[#666]">
        <NavLink
          to="about"
          className={({ isActive }) =>
            isActive ? 'text-[#5cb85c] pb-[0.65rem] border-b-2 border-b-[#5cb85c]' : ''
          }
        >
          About
        </NavLink>
        <NavLink
          to="myarticles"
          className={({ isActive }) =>
            isActive ? 'text-[#5cb85c] pb-[0.65rem] border-b-2 border-b-[#5cb85c] mx-5' : 'mx-5'
          }
        >
          My Articles
        </NavLink>
        <NavLink
          to="favarticles"
          className={({ isActive }) =>
            isActive ? 'text-[#5cb85c] pb-[0.65rem] border-b-2 border-b-[#5cb85c]' : ''
          }
        >
          Favorited Articles
        </NavLink>
      </div>

      <div className="">
        <Routes>
          <Route
            path="about"
            element={isLoading ? <SkeletonAbout /> : <About userProfile={userProfile} />}
          />
          <Route path="myarticles" element={<MyArticles />} />
          <Route path="favarticles" element={<FavArticles />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </div>
  );
}

export default ProfilePage;
