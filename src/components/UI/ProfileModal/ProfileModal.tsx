import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { authActions } from 'store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

const ProfileModal: React.FC<{ onToggleModal: (input: boolean) => void; position: string }> = ({
  onToggleModal,
  position,
}) => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        e.target instanceof Element &&
        !e.target.closest('.navAvatar') &&
        !e.target.closest('.profile-modal')
      ) {
        onToggleModal(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onToggleModal]);

  return (
    <div
      className={`${
        position === 'bot'
          ? 'bot-profile-modal right-2 bottom-[3.8rem] lg:left-1'
          : 'top-profile-modal right-1 top-14'
      } profile-modal text-left flex flex-col gap-8 w-[20rem] bg-white border border-gray-300 shadow-md px-7 py-8 absolute  z-20 rounded-md`}
    >
      <span
        className="absolute right-4 top-3 cursor-pointer text-xl hover:text-red-500"
        onClick={() => onToggleModal(false)}
      >
        <i className="fa-regular fa-circle-xmark"></i>
      </span>
      <Link
        to={`/profile/${authState.username}/myarticles`}
        className="hover:text-green-500"
        onClick={() => onToggleModal(false)}
      >
        <i className="fa-solid fa-newspaper mr-2"></i>
        <span>My articles</span>
      </Link>
      <Link
        to={`/profile/${authState.username}/favarticles`}
        className="hover:text-green-500"
        onClick={() => onToggleModal(false)}
      >
        <i className="fa-solid fa-heart mr-2"></i>
        <span>Favorite articles</span>
      </Link>
      <Link to={`/profile/${authState.username}/settings`} className="hover:text-green-500">
        <i className="fa-solid fa-gear mr-2"></i>
        <span>Settings</span>
      </Link>
      <Link
        to="/"
        className="cursor-pointer hover:text-green-500"
        onClick={() => dispatch(authActions.logout())}
      >
        <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
        <span>Sign out</span>
      </Link>
      <hr className="-mx-7" />
      <div>
        <p className="capitalize">{authState.username}</p>
        <p className="text-gray-500 text-sm">{authState.email}</p>
      </div>
      <Link
        to={`/profile/${authState.username}/about`}
        className="rounded-2xl border border-black py-1 text-center hover:bg-green-500 hover:text-white"
        onClick={() => onToggleModal(false)}
      >
        View profile
      </Link>
    </div>
  );
};

export default ProfileModal;
