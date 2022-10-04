import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonAbout = () => {
  return (
    <div className="my-6">
      <div className="left lg:pr-[3rem]">
        <Skeleton className="h-[30px] w-[50vw]" />

        <Skeleton className="mt-8 h-[35px]" />

        <Skeleton className="h-[80px]" />
        <Skeleton className="h-[100px] mt-6" />
        <Skeleton className="h-[100px] mt-6" />
        <Skeleton className="h-[100px] mt-6" />
      </div>
    </div>
  );
};

export default SkeletonAbout;
