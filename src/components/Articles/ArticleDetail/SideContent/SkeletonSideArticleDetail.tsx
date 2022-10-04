import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAppSelector } from 'store/hooks';

const SkeletonSideArticleDetail = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className={`right-content px-8 sticky  ${isAuthenticated ? 'top-5' : 'top-[3.5rem]'}`}>
      <Skeleton className="rounded-2xl w-full px-3 py-[0.5rem] my-7 " />

      <Skeleton className="search flex items-center border focus-within:border-black rounded-2xl px-3 py-[0.5rem]" />

      <div className="pt-4">
        <Skeleton className="rounded-full w-[100px] h-[100px] cursor-pointer" />
      </div>
      <Skeleton className="w-[100px] h-[25px] my-3" />
      <Skeleton className="w-[150px] h-[25px] " />
      <Skeleton className="h-[30px] mt-3" />

      <div className="tag pt-5 text-white">
        <Skeleton className="w-[120px] rounded-2xl px-5 py-3 " />
      </div>
      <Skeleton className="w-[150px] h-[25px] mt-3" />

      <div className="flex justify-between py-5">
        <div>
          <div className="flex items-center">
            <Skeleton className="w-[30px] h-[30px] rounded-full" />
            <Skeleton className="ml-2 w-[70px] h-[20px]" />
          </div>
          <Skeleton className="w-[150px] xl:w-[200px] h-[30px]" />
        </div>
        <Skeleton className="w-[70px] h-[70px] ml-2" />
      </div>
      <div className="flex justify-between py-5">
        <div>
          <div className="flex items-center">
            <Skeleton className="w-[30px] h-[30px] rounded-full" />
            <Skeleton className="ml-2 w-[70px] h-[20px]" />
          </div>
          <Skeleton className="w-[150px] xl:w-[200px] h-[30px]" />
        </div>
        <Skeleton className="w-[70px] h-[70px] ml-2" />
      </div>
      <div className="flex justify-between py-5">
        <div>
          <div className="flex items-center ">
            <Skeleton className="w-[30px] h-[30px] rounded-full" />
            <Skeleton className="ml-2 w-[70px] h-[20px]" />
          </div>
          <Skeleton className="w-[150px] xl:w-[200px] h-[30px]" />
        </div>
        <Skeleton className="w-[70px] h-[70px] ml-2" />
      </div>
    </div>
  );
};

export default SkeletonSideArticleDetail;
