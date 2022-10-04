import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonArticle = () => {
  return (
    <div className="a-article border-b border-b-gray-300 py-6">
      <div className="gr-top flex justify-between items-center">
        <div className="left flex items-center">
          <Skeleton className="w-[50px] h-[50px] rounded-full mr-3" />

          <div className="title-date">
            <Skeleton className="w-[90px] sm:w-[100px] h-[25px]" />
            <Skeleton className=" w-[120px] sm:w-[200px] h-[20px]" />
          </div>
        </div>
        <Skeleton className="w-[30px] h-[30px] rounded-lg" />
      </div>
      <div className="gr-middle my-5">
        <Skeleton className="w-1/3 h-[30px]" />
        <Skeleton className="h-[30px] w-1/2" />
      </div>
      <div className="gr-bot flex justify-between items-center">
        <Skeleton className="w-[100px] h-[25px] rounded-lg" />
        <div className="tags flex gap-x-1 ">
          <Skeleton className="py-[0.3rem] px-[0.5rem] w-[35px] rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonArticle;
