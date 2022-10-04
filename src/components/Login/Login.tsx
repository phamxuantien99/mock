import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { authActions } from 'store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

function Login() {
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(location.pathname.includes('login') ? true : false);

  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: '',
      email: '',
      password: '',
      repassword: '',
      isLogin: isLogin,
    },
    validationSchema: Yup.object({
      isLogin: Yup.boolean(),
      username: Yup.string().when('isLogin', {
        is: false,
        then: Yup.string().required('Username is required'),
      }),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
      repassword: Yup.string().when('isLogin', {
        is: false,
        then: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm password is required'),
      }),
    }),
    onSubmit: (values) => {
      const { username, email, password } = values;
      if (isLogin) {
        dispatch(authActions.login({ email, password }));
      } else {
        dispatch(authActions.register({ username, email, password }));
      }
    },
  });

  useEffect(() => {
    location.pathname.includes('login') ? setIsLogin(true) : setIsLogin(false);
  }, [location]);

  if (authState.isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-8 lg:py-4 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">
      <div className="w-4/5 sm:w-2/3 lg:3/5 xl:w-2/5 ">
        <form
          className="bg-white shadow-md rounded-xl px-6 md:px-14 pt-6 pb-8 mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <h2 className="text-center my-3 md:my-6">
            <span className="font-bold text-2xl sm:text-3xl md:text-4xl">
              {isLogin ? 'Login' : 'Register'}
            </span>
          </h2>
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-gray-700 text-medium font-medium" htmlFor="username">
                Username
              </label>
              <div
                className={`py-1 sm:py-3 pl-2 border-b-2 border-gray-300 focus-within:border-gray-600 flex ${
                  formik.errors.username && formik.touched.username && 'border-red-500'
                }`}
              >
                <span
                  className={`text-gray-400 ${
                    formik.errors.username && formik.touched.username && 'text-red-500'
                  }`}
                >
                  <i className="fa-regular fa-user"></i>
                </span>
                <input
                  className={`pl-5 outline-none w-full text-gray-700  placeholder:italic  focus:placeholder-gray-600 ${
                    formik.errors.username && formik.touched.username && 'placeholder-red-500'
                  }`}
                  id="username"
                  name="username"
                  type="text"
                  value={formik.values.username}
                  placeholder="Type your username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors.username && formik.touched.username && (
                <div className="text-red-500 text-sm mt-2">{formik.errors.username}</div>
              )}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 text-medium font-medium" htmlFor="Email">
              Email
            </label>
            <div
              className={`py-1 sm:py-3 pl-2 border-b-2 border-gray-300 focus-within:border-gray-600 flex ${
                formik.errors.email && formik.touched.email && 'border-red-500'
              }`}
            >
              <span
                className={`text-gray-400 ${
                  formik.errors.email && formik.touched.email && 'text-red-500'
                }`}
              >
                <i className="fa-regular fa-envelope"></i>
              </span>
              <input
                className={`pl-5 outline-none w-full text-gray-700  placeholder:italic  focus:placeholder-gray-600 ${
                  formik.errors.email && formik.touched.email && 'placeholder-red-500'
                }`}
                id="Email"
                name="email"
                type="text"
                value={formik.values.email}
                placeholder="Type your email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm mt-2">{formik.errors.email}</div>
            )}
          </div>

          <div className={`${isLogin ? 'mb-3' : 'mb-6'}`}>
            <label className="block text-gray-700 text-medium font-medium" htmlFor="password">
              Password
            </label>
            <div
              className={`py-1 sm:py-3 pl-2 border-b-2 border-gray-300 focus-within:border-gray-600 flex ${
                formik.errors.password && formik.touched.password && 'border-red-500'
              }`}
            >
              <span
                className={`text-gray-400 ${
                  formik.errors.password && formik.touched.password && 'text-red-500'
                }`}
              >
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                className={`pl-5 outline-none w-full text-gray-700  placeholder:italic  focus:placeholder-gray-600 ${
                  formik.errors.password && formik.touched.password && 'placeholder-red-500'
                }`}
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                placeholder="Type your password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm mt-2">{formik.errors.password}</div>
            )}
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="block text-gray-700 text-medium font-medium" htmlFor="password">
                Confirm Password
              </label>
              <div
                className={`py-1 sm:py-3 pl-2 border-b-2 border-gray-300 focus-within:border-gray-600 flex ${
                  formik.errors.repassword && formik.touched.repassword && 'border-red-500'
                }`}
              >
                <span
                  className={`text-gray-400 ${
                    formik.errors.repassword && formik.touched.repassword && 'text-red-500'
                  }`}
                >
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  className={`pl-5 outline-none w-full text-gray-700  placeholder:italic  focus:placeholder-gray-600 ${
                    formik.errors.repassword && formik.touched.repassword && 'placeholder-red-500'
                  }`}
                  id="repassword"
                  name="repassword"
                  type="password"
                  value={formik.values.repassword}
                  placeholder="Type your confirm password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors.repassword && formik.touched.repassword && (
                <div className="text-red-500 text-sm mt-2">{formik.errors.repassword}</div>
              )}
            </div>
          )}

          {isLogin && (
            <div className="text-right">
              <span
                className="inline-block cursor-pointer align-baseline font-bold text-sm text-gray-400 hover:text-blue-800 focus:text-black"
                onClick={() => {
                  window.alert('Please contact Admin for more information!');
                }}
              >
                Forgot Password?
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              className="w-full mx-auto my-4 md:my-8 py-2 md:py-1 sm:py-3 px-4 font-medium text-lg md:text-xl bg-gradient-to-r from-sky-400 via-violet-500 to-pink-600 hover:bg-gradient-to-r hover:from-pink-600 hover:via-sky-400 hover:to-violet-500 text-white rounded-full focus:outline-none focus:shadow-outline transition-all duration-1000 ease-in-out"
              type="submit"
            >
              {isLogin ? 'LOGIN' : 'SIGN UP'}
            </button>
          </div>

          <div className="text-center text-sm md:text-base">
            <div>
              {isLogin ? "Don't have an account?" : 'Have account already?'}{' '}
              <Link
                to={`/${isLogin ? 'register' : 'login'}`}
                className="inline-block cursor-pointer align-baseline font-bold text-base md:text-md text-orange-600 hover:text-blue-800"
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
              >
                {isLogin ? 'Sign Up Now' : 'Login Now'}
              </Link>
            </div>
            <div>OR</div>
            <div>
              <span>
                <Link to="/home" className="font-semibold text-fuchsia-600 hover:text-blue-800">
                  Explore
                </Link>
              </span>{' '}
              without account now!
            </div>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 HN22_REACT01_G2. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
