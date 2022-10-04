import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import fallback from '../../../assets/images/blackCat.png';

import AuthorType from 'types/AuthorType';

import './ProfileTooltip.css';

const ProfileTooltip: React.FC<{ author: AuthorType; children: ReactNode }> = ({
  author,
  children,
}) => {
  return (
    <div className="tooltip">
      {children}
      <div className="tooltiptext shadow-lg bg-[#f1f1f1]">
        <div className=" py-1 px-4 md:py-2 flex gap-4 items-center">
          <Link to={`/profile/${author?.username}/about`}>
            <img
              src={author.image}
              onError={(e) => {
                e.currentTarget.src = fallback;
              }}
              className="w-16 h-16 md:w-20 md:h-20 border border-gray-500"
              alt="profile"
            />
          </Link>

          <div className="text-left flex flex-col gap-1 text-black">
            <h3 className="text-xl font-medium text-green-600">{author?.username}</h3>
            <p className="line-clamp-2 max-w-[12rem] h-[2.8rem]">
              {(author?.bio?.slice(0, 75) || '') + '...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTooltip;
