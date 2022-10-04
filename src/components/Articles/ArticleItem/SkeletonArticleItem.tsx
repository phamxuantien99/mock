import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonArticleItem = () => {
  return (
    <div className="flex flex-col left-content mt-12">
      <div className="border-b-[1px] border-b-[#e6e6e6] pb-8 ">
        <div className="user-name flex gap-4 items-center ">
          <Skeleton circle={true} className="rounded-[50%] w-[50px] h-[50px] cursor-pointer" />

          <Skeleton width={80} />
          <Skeleton width={80} />
        </div>
        <div className="content flex justify-between mt-2">
          <div className="text-content flex flex-col gap-2">
            <Skeleton className="w-[150px] sm:w-[350px] md:w-[500px] lg:w-[350px] xl:w-[550px] max-h-[100px] sm:h-[20px]" />
            <Skeleton className="main-content hidden sm:block h-[90px]" />
          </div>

          <Skeleton className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]" />
        </div>
        <div className="some-info flex justify-between mt-3 sm:mt-7 items-center">
          <div className="left flex gap-x-4">
            <Skeleton className="px-2 py-[0.3rem] rounded-xl mr-6" />
            <Skeleton className="hidden sm:inline-block px-2 py-[0.3rem]" width={100} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonArticleItem;
