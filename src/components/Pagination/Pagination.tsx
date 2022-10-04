import React from 'react';

const Pagination: React.FC<{
  pageCount: number;
  offset: number;
  setOffset: (newOffset: number | ((prev: number) => number)) => void;
}> = ({ pageCount, offset, setOffset }) => {
  return (
    <div className="flex justify-center items-center mb-24 lg:mb-10 gap-4">
      <button
        className="cursor-pointer hover:text-green-500 hover:scale-110 text-xl disabled:opacity-20"
        disabled={offset === 0}
        onClick={() => {
          offset > 0 && setOffset((offset) => offset - 10);
        }}
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>
      {Array(pageCount)
        .fill(0)
        .map((_, index) => (
          <span
            key={index}
            className={`cursor-pointer border-2 border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:border-green-500 ${
              index === offset / 10 && 'bg-green-500 text-white border-green-500'
            }`}
            onClick={() => setOffset(index * 10)}
          >
            {index + 1}
          </span>
        ))}
      <button
        className="cursor-pointer hover:text-green-500 hover:scale-110 text-xl disabled:opacity-20"
        disabled={offset === (pageCount - 1) * 10}
        onClick={() => {
          offset < (pageCount - 1) * 10 && setOffset((offset) => offset + 10);
        }}
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
