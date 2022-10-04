import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAppSelector } from 'store/hooks';

const SkeletonArticleDetail = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <div
      className={`first-line:col-span-3 lg:col-span-2 flex flex-col left-content pt-12 mx-auto lg:border-r
      border-r-grey-500  pb-16 lg:pb-0 ${
        isAuthenticated ? 'lg:pl-0' : 'pl-8 sm:pl-14'
      } pr-8 sm:pr-14 lg:pr-16 2xl:pr-24 2xl:pl-[76px] min-h-screen w-full break-words`}
    >
      <div className="pb-8">
        <div className="user-name flex justify-between items-center ">
          <span className="flex gap-2">
            <Skeleton className="rounded-[50%] w-[50px] h-[50px] cursor-pointer" />

            <div className="flex flex-col gap-2">
              <Skeleton className="px-2 h-[20px] w-[80px]" />
              <div className="flex items-center gap-x-3 h-[20px]">
                <Skeleton className="w-[50px] md:w-[80px]" />
                <Skeleton className="w-[80px] md:w-[100px]" />
              </div>
            </div>
          </span>
          <Skeleton className="w-[50px] h-[30px]" />
        </div>

        <div className="content flex items-center justify-between mt-4 ">
          <div className="text-content">
            <Skeleton className="w-[300px] sm:w-[500px] md:w-[650px] lg:w-[450px] xl:w-[550px] h-[30px] mb-6" />
            <Skeleton className="w-[85vw] lg:w-[53vw] xl:w-[55vw] 2xl:w-[40vw] h-[70vh] sm:h-[50vh] md:h-[80vh] lg:h-[70vh]" />
          </div>
        </div>
        <div className="some-info flex justify-between mt-3 sm:mt-7 items-center">
          <div className="left flex">
            <div className="pr-7 flex items-center gap-1 ">
              <Skeleton className="w-[30px] h-[30px]" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="w-[30px] h-[30px]" />
            </div>
          </div>
          <div className="right flex items-center gap-1">
            <Skeleton className="w-[60px] h-[30px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonArticleDetail;
