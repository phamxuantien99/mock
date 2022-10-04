import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div
      className={`bg-[#ffc017] pt-40 pb-36 pl-10 md:pl-20 border-b-[1px] border-b-black font-sourceSerif `}
    >
      <div className="max-w-[96rem] mx-auto 2xl:px-24">
        <p className="text-[5rem] sm:text-[5.5rem] md:text-8xl font-semibold transition-all duration-600 ease-out">
          Being hungry.
        </p>
        <p className="mt-3 mb-9 sm:mt-9 sm:mb-16 text-xl sm:text-2xl sm:w-[25rem] md:w-[30rem] transition-all duration-600 ease-out">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, optio!.
        </p>
        <Link to="" className=" text-xl bg-black text-white px-14 py-3 rounded-3xl hover:bg-[#111]">
          Start Eating
        </Link>
      </div>
    </div>
  );
}

export default Hero;
