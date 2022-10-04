import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useSearchParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useAppSelector } from 'store/hooks';
import { axiosClient } from 'api/axios-utils';

import { ErrorMessage } from 'components/UI';

function SideContent() {
  const authState = useAppSelector((state) => state.auth);
  const [isShowed, setIsShowed] = useState(true);

  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get('tag');

  const fetchTags = async () => {
    const res = await axiosClient({
      url: '/tags',
      method: 'GET',
    });
    return res.data.tags;
  };

  const {
    data: tagsList,
    error,
    isLoading,
  } = useQuery('tags', fetchTags, {
    refetchOnWindowFocus: false,
    retry: true,
  });

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div
      className={`right-content mx-8 sticky ${
        authState.isAuthenticated ? 'top-10' : 'top-[4.7rem]'
      }`}
    >
      <div className="search flex flex-nowrap items-center justify-starts border border-gray-300 focus:border-black rounded-3xl px-3 py-[0.35rem] mt-10 focus-within:border-black">
        <i className="fa-solid fa-magnifying-glass mr-2 "></i>
        <input type="text" placeholder="Search" className="outline-0 w-full py-1" />
      </div>
      <p className="text-base font-semibold mt-5">Recommended topics</p>
      <div className="tags flex flex-wrap gap-2 mt-2">
        {isLoading ? (
          <>
            <Skeleton className="w-[150px] h-[30px] rounded-sm px-4 py-1" />
            <Skeleton className="w-[100px] h-[30px] rounded-sm px-4 py-1" />
            <Skeleton className="w-[100px] h-[30px] rounded-sm px-4 py-1" />
            <Skeleton className="w-[150px] h-[30px] rounded-sm px-4 py-1" />
          </>
        ) : (
          tagsList?.map((tag: string) => (
            <Link
              to={`/article?tag=${tag}`}
              key={tag}
              className={`border-[#ccc] border rounded-sm  px-4 py-1 hover:bg-[#ffc017] ${
                tagParam === tag && 'bg-[#ffc017]'
              }`}
            >
              {tag}
            </Link>
          ))
        )}
      </div>
      {isShowed && (
        <div className="writing bg-[#e1f0ff] px-6 pt-5 pb-8 rounded relative mt-6">
          <i
            className="fa-solid fa-xmark right-[1rem] top-[0.5rem] absolute hover:text-[#555] hover:cursor-pointer "
            onClick={() => setIsShowed((prev) => !prev)}
          ></i>
          <p className="font-bold">Writing on Premium</p>
          <div className="middle font-medium my-4 leading-[1.9rem]">
            <p>New writer FAQ</p>
            <p>Expert writing advice</p>
            <p>Grow your readership</p>
          </div>
          <Link
            to="/editor"
            className="bg-black text-white px-4 py-2 rounded-3xl text-sm hover:bg-[#222] hover:text-[#ffc017]"
          >
            Start writing
          </Link>
        </div>
      )}

      <div className="reading-list pb-10 mt-5">
        <p className="font-semibold">Reading list</p>
        <p className="text-sm my-4 text-[#757575]">
          Click the <i className="fa-regular fa-heart"></i> on any story to easily like it to your
          fav list or a custom list that you can share.
        </p>
        <div className="reading-tags flex flex-wrap gap-4 text-xs text-[#757575]">
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
          <Link to="" className="hover:text-gray-800">
            Knowable
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideContent;
