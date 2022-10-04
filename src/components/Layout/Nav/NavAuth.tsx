import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import fallback from '../../../assets/images/blackCat.png';
import logoYellow from '../../../assets/images/logoYellow.svg';
import { useAppSelector } from 'store/hooks';
import ProfileModal from 'components/UI/ProfileModal/ProfileModal';

function NavAuth() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const authState = useAppSelector((state) => state.auth);

  return (
    <div className="z-10 bg-white flex items-center lg:flex-col shadow-inner lg:shadow-none lg:border-r-[1px] border-r-[#e6e6e6] px-4 md:px-8 lg:px-4 2xl:px-8 w-screen lg:w-auto lg:h-screen py-3 lg:py-12  text-center justify-between fixed bottom-0 lg:[top-0 left-0]">
      <NavLink to="">
        <img src={logoYellow} className="w-[2.5rem] animate-pulse" alt="" />
      </NavLink>
      <div className="main-nav flex lg:flex-col gap-10 md:gap-16 lg:gap-10 items-center">
        <NavLink to="/home" className={({ isActive }) => (isActive ? 'text-green-700' : '')}>
          <i className="fa-solid fa-house text-2xl 2xl:text-3xl hover:text-green-500"></i>
        </NavLink>
        <NavLink
          to={`/profile/${authState.username}/about`}
          className={({ isActive }) => (isActive ? 'text-green-700' : '')}
        >
          <i className="fa-regular fa-file-lines text-2xl 2xl:text-3xl hover:text-green-500"></i>
        </NavLink>
        <NavLink to="/editor" className={({ isActive }) => (isActive ? 'text-green-700' : '')}>
          <p>
            <i className="fa-regular fa-pen-to-square text-2xl 2xl:text-3xl hover:text-green-500"></i>
          </p>
        </NavLink>
      </div>
      <div className="ava flex justify-center relative">
        <button onClick={() => setShowProfileModal(!showProfileModal)}>
          <img
            className="navAvatar rounded-full w-[50px] h-[50px]  object-cover"
            src={authState.image ?? fallback}
            onError={(e) => {
              e.currentTarget.src = fallback;
            }}
            alt=""
          />
        </button>
        {showProfileModal && <ProfileModal onToggleModal={setShowProfileModal} position="bot" />}
      </div>
    </div>
  );
}

export default NavAuth;
