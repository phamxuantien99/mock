import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { axiosClient } from 'api/axios-utils';

import fallback from '../../assets/images/blackCat.png';
import loading from '../../assets/images/Loading.svg';
import './Settings.css';

import { useAppSelector, useAppDispatch } from 'store/hooks';
import { authActions } from 'store/features/auth/authSlice';
// import { ErrorMessage } from 'components/UI';

type ProfileUpdate = {
  username: string;
  email: string;
  password: string | null;
  image: string | null;
  bio: string | null;
};

function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { email, username, bio, image, token } = useAppSelector((state) => state.auth);

  const submitHandler = async (values: ProfileUpdate) => {
    setIsLoading(true);
    try {
      const res = await axiosClient({
        method: 'PUT',
        url: '/user',
        headers: {
          Authorization: `Token ${token}`,
        },
        data: { user: values },
      });

      dispatch(authActions.loginSuccess(res.data.user));
      setIsLoading(false);
      toast.success('Profile updated successfully 👌');
    } catch (err) {
      // setError('Something went wrong! Please try again later');
      setIsLoading(false);
      toast.error('Something went wrong! Please try again later');
      console.log(err);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: image || '',
      username: username || '',
      bio: bio || '',
      email: email || '',
      password: '',
    },
    validationSchema: Yup.object({
      image: Yup.string().url('Must be a valid URL'),
      username: Yup.string().required('Required'),
      bio: Yup.string(),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters'),
    }),
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // if (error) {
  //   return <ErrorMessage />;
  // }

  return (
    <div className="flex md:mx-[76px]">
      <div className="sidebar hidden lg:block max-w-[30%] pt-8 md:px-[20px]">
        <Link
          to="/home"
          className="flex items-center gap-2 h-[46px] mt-[20px] mb-8 font-bold text-2xl text-gray-500 hover:text-green-500"
        >
          <i className="fa-solid fa-house"></i>
          <p className="pt-1">Home</p>
        </Link>
        <h3 className="h-[46px]  font-bold text-xl">Settings</h3>
        <ul>
          <Link
            to={`/profile/${username}/about`}
            className="inline-block h-[46px] text-base text-[#757575] hover:text-green-500"
          >
            About you
          </Link>
          <li className="h-[46px] text-base text-[#757575] hover:text-green-500 cursor-pointer">
            Design
          </li>
          <li className="h-[46px] text-base text-[#757575] hover:text-green-500 cursor-pointer relative">
            Audience Development{' '}
            <span className="absolute text-[.65rem] text-[#4e9d46] top-[-5px]">New</span>
          </li>
          <li className="h-[46px] text-base text-[#757575] hover:text-green-500 cursor-pointer">
            Email settings
          </li>
          <li className="h-[46px] text-base text-[#757575] hover:text-green-500 cursor-pointer">
            Connections
          </li>
          <li className="h-[46px] text-base text-[#757575] hover:text-green-500 cursor-pointer">
            Account
          </li>
          <li className="h-[46px] text-base text-[#757575] hover:text-green-500 cursor-pointer">
            Membership
          </li>
          <li className="h-[46px] text-base text-[#757575] hover:text-green-500 cursor-pointer">
            Integration token
          </li>
          <li className="h-[46px] text-base text-[#757575] hover:text-green-500 cursor-pointer">
            Security
          </li>
        </ul>
        <div className="reading-tags border-t-[1px] border-t-gray-200 flex flex-wrap py-5 gap-[0.35rem] text-xs text-[#757575]">
          <NavLink to="" className="hover:text-gray-800 pr-[10px]">
            Help
          </NavLink>
          <NavLink to="" className="hover:text-gray-800 pr-[10px]">
            Status
          </NavLink>
          <NavLink to="" className="hover:text-gray-800 pr-[10px]">
            Writers
          </NavLink>
          <NavLink to="" className="hover:text-gray-800 pr-[10px]">
            Blog
          </NavLink>
          <NavLink to="" className="hover:text-gray-800 pr-[10px]">
            Careers
          </NavLink>
          <NavLink to="" className="hover:text-gray-800 pr-[10px]">
            Privacy
          </NavLink>
          <NavLink to="" className="hover:text-gray-800 pr-[10px]">
            Terms
          </NavLink>
          <NavLink to="" className="hover:text-gray-800 pr-[10px]">
            About
          </NavLink>
          <NavLink to="" className="hover:text-gray-800 pr-[10px]">
            Knowable
          </NavLink>
        </div>
      </div>
      <form
        className="right px-[20px] pt-[60px] w-full"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <h2 className="h-[46px] border-b-[1px] border-b-gray-200 font-bold text-2xl ">About You</h2>
        <div className="pt-[30px] pb-[35px] flex flex-wrap justify-between">
          <div className="mr-[10px] ">
            <div className="font-bold">Email</div>
            <div className="mt-[10px] max-w-[480px]">
              <input
                className="inline-block w-full text-lg text-[#5cb85c] focus:text-black focus:border-b-[1px] border-b-gray-200 pb-[8px] mb-2 outline-none"
                placeholder="Add your email"
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}

              <p className="py-3 mt-[24px] ">
                Your email appears on your
                <Link
                  to={`/profile/${username}/about`}
                  className="hover:text-gray-800 underline px-1"
                >
                  Profile
                </Link>
                page, as your byline, and in your responses. It is a required field.
              </p>
            </div>
          </div>
          <label
            htmlFor="email"
            className="edit inline-block align-items hover:text-black hover:border-black border-[1px] text-gray-500  loading-[37px] py-1 px-3 rounded-[16px] cursor-pointer"
          >
            Edit
          </label>
        </div>

        <div className="pt-[30px] pb-[35px] flex flex-wrap justify-between">
          <div className="mr-[10px] ">
            <div className="font-bold">Username</div>
            <div className="mt-[10px] max-w-[480px]">
              <input
                className="inline-block w-full text-lg text-[#5cb85c] focus:text-black focus:border-b-[1px] border-b-gray-200 pb-[8px] mb-2 outline-none"
                placeholder="Add your username"
                type="text"
                name="username"
                id="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500">{formik.errors.username}</div>
              ) : null}

              <p className="py-3 mt-[24px] ">
                Your name appears on your
                <Link
                  to={`/profile/${username}/about`}
                  className="hover:text-gray-800 underline px-1"
                >
                  Profile
                </Link>
                page, as your byline, and in your responses. It is a required field.
              </p>
            </div>
          </div>
          <label
            htmlFor="username"
            className="edit inline-block align-items hover:text-black hover:border-black border-[1px] text-gray-500  loading-[37px] py-1 px-3 rounded-[16px] cursor-pointer"
          >
            Edit
          </label>
        </div>

        <div className="pt-[30px] pb-[35px] flex  flex-wrap justify-between">
          <div className="mr-[10px] ">
            <div className="font-bold">Short bio</div>
            <div className="mt-[10px] max-w-[480px]">
              <input
                className="inline-block w-full text-lg text-[#5cb85c] focus:text-black focus:border-b-[1px] border-b-gray-200 pb-[8px] mb-2 outline-none"
                placeholder="Add your short bio"
                type="text"
                name="bio"
                id="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.bio && formik.errors.bio ? (
                <div className="text-red-500">{formik.errors.bio}</div>
              ) : null}

              <p className="py-3 mt-[24px] ">
                Your short bio appears on your
                <Link
                  to={`/profile/${username}/about`}
                  className="hover:text-gray-800 underline px-1"
                >
                  Profile
                </Link>
                and next to your stories. Max 160 characters.
              </p>
            </div>
          </div>
          <label
            htmlFor="bio"
            className="edit inline-block align-items hover:text-black hover:border-black border-[1px] text-gray-500  loading-[37px] py-1 px-3 rounded-[16px] cursor-pointer"
          >
            Edit
          </label>
        </div>

        <div className="pt-[30px] pb-[35px] flex  flex-wrap justify-between">
          <div className="mr-[10px] ">
            <div className="font-bold">New Password</div>
            <div className="mt-[10px] max-w-[480px]">
              <input
                className="inline-block w-full text-lg text-[#5cb85c] focus:text-black focus:border-b-[1px] border-b-gray-200 pb-[8px] mb-2 outline-none"
                placeholder="Add your new password"
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}

              <p className="py-3 mt-[24px] ">
                Change your new password for more security. Dolore repellat, ut nam in enim
                architecto accusantium dicta?
              </p>
            </div>
          </div>
          <label
            htmlFor="password"
            className="edit inline-block align-items hover:text-black hover:border-black border-[1px] text-gray-500  loading-[37px] py-1 px-3 rounded-[16px] cursor-pointer"
          >
            Edit
          </label>
        </div>

        <div className="pt-[30px] pb-[35px] flex flex-wrap justify-between">
          <div className="div">
            <div className="mr-[10px]">
              <div className="">
                <div className="font-bold">Photo</div>
                <div className="flex items-center mb-2">
                  <div className="max-w-[480px] mt-[10px]">
                    <input
                      className="inline-block w-full text-lg text-[#5cb85c] focus:text-black focus:border-b-[1px] border-b-gray-200 pb-[8px] mb-2 outline-none"
                      placeholder="Add your photo"
                      type="text"
                      name="image"
                      id="image"
                      value={formik.values.image}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.image && formik.errors.image ? (
                      <div className="text-red-500">{formik.errors.image}</div>
                    ) : null}

                    <p className="py-3 mt-[24px]">
                      Your photo appears on your
                      <Link
                        to={`/profile/${username}/about`}
                        className="hover:text-gray-800 underline px-1"
                      >
                        Profile
                      </Link>
                      page and with your stories across Premium.
                    </p>
                    <p>Your photo must be a valid URL. It must be a JPG, GIF, or PNG file.</p>
                  </div>
                  {/* <div className="items-center ml-[24px] md:pl-[64px] min-w-[50px]"> */}
                  <img
                    src={formik.values.image || fallback}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.src = fallback;
                    }}
                    className="inline-block ml-[24px] md:ml-[64px] w-[50px] h-[50px] rounded-full md:w-[80px] md:h-[80px] border object-cover "
                  />
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor="image"
            className="edit inline-block align-items hover:text-black hover:border-black border-[1px] text-gray-500  loading-[37px] py-1 px-3 rounded-[16px] cursor-pointer"
          >
            Edit
          </label>
        </div>
        <div className="text-right mb-6">
          {isLoading ? (
            <div className="flex justify-end items-center text-lg font-medium">
              <span>Updating</span>
              <img src={loading} alt="loading" className="w-[3rem] h-[3rem]" />
            </div>
          ) : (
            <div className="flex justify-end items-center">
              <button
                className="lg:hidden mr-4 border border-gray-300 rounded-lg px-4 py-1 text-md text-black hover:bg-gray-500 focus:outline-none"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                className="mr-4 border border-gray-300 rounded-lg px-4 py-1 text-md text-white bg-red-500 hover:bg-red-600 focus:outline-none"
                type="button"
                onClick={() => formik.resetForm()}
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={!formik.dirty}
                className="text-white text-xl bg-green-500 hover:bg-green-600 py-1 px-4 rounded-[16px] cursor-pointer 
             disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Settings;
