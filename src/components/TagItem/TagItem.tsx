import React from 'react';

const TagItem: React.FC<{ tag: string; closeFn: () => void; canHide: boolean }> = ({
  tag,
  closeFn,
  canHide = true,
}) => {
  return (
    <div className="mt-2 tags">
      <span
        className={`tagItem relative text-white text-sm rounded-lg border bg-[#ffc017] pl-3 ${
          canHide ? 'pr-5' : 'pr-2'
        } pt-[0.3rem] pb-1 mr-1`}
      >
        #<span className="">{tag}</span>
        {canHide && (
          <i
            className="fa-solid fa-xmark cursor-pointer hover:text-red-500 absolute right-1 top-[0.1rem]"
            onClick={closeFn}
          ></i>
        )}
      </span>
    </div>
  );
};

export default TagItem;
