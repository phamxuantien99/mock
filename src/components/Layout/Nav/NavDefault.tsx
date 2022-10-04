import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';
import logoYellow from '../../../assets/images/logoYellow.svg';

function NavDefault() {
  const [bgColor, setBgColor] = useState('yellow');

  const changeColor = () => {
    if (window.scrollY > 550) {
      setBgColor('white');
    } else {
      setBgColor('yellow');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeColor);
  }, []);

  return (
    <div
      className={`${
        bgColor === 'white' ? 'bg-black  ease-in-out py-2' : 'bg-[#ffc017]  ease-in-out py-4'
      }  px-8 md:px-20 border-b-[1px] border-b-black fixed w-full z-10 transition-all duration-[750ms]`}
    >
      <div className="flex justify-between items-center max-w-[96rem] mx-auto 2xl:px-32">
        <NavLink
          to="/home"
          className={`nav-left flex items-center ${
            bgColor === 'white'
              ? 'text-[#ffc017] transition-all duration-[750ms] ease-in-out '
              : 'text-black transition-all duration-[750ms] ease-in-out'
          } `}
        >
          <img src={bgColor === 'white' ? logoYellow : logo} className="w-[2.5rem] mr-3" alt="" />
          <span className="text-4xl font-extrabold font-crimson">Premium</span>
        </NavLink>
        <div className="nav-right text-sm">
          <NavLink
            to="/login"
            className={`hidden md:inline ${
              bgColor === 'white'
                ? 'text-white  transition-all duration-[750ms] ease-in-out'
                : 'text-black  transition-all duration-[750ms] ease-in-out'
            }`}
          >
            Our story
          </NavLink>

          <NavLink
            to="/login"
            className={`hidden md:inline ml-7 ${
              bgColor === 'white'
                ? 'text-white transition-all duration-[750ms] ease-in-out'
                : 'text-black transition-all duration-[750ms] ease-in-out'
            }`}
          >
            Write
          </NavLink>
          <NavLink
            to="/login"
            className={`mx-7 hidden sm:inline ${
              bgColor === 'white'
                ? 'text-white transition-all duration-[750ms] ease-in-out'
                : 'text-black transition-all duration-[750ms] ease-in-out'
            }`}
          >
            Sign In
          </NavLink>
          <NavLink
            to="/login"
            className={`${
              bgColor === 'white'
                ? 'bg-[#ffc017] text-black hover:bg-[#ffd35b]  transition-all duration-[750ms] ease-in-out'
                : 'bg-black hover:bg-[#444]  transition-all duration-[750ms] ease-in-out'
            } text-white px-4 py-2 rounded-3xl`}
          >
            Get Started
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NavDefault;
