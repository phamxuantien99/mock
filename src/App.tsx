import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserType from './types/UserType';

import { axiosClient } from 'api/axios-utils';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { authActions } from 'store/features/auth/authSlice';

import { LoginPage } from './pages';
import { Settings } from './components';
import { Layout } from './components/Layout';
import { LoadingModal } from 'components/UI';

import { HomePage, ProfilePage, ArticleDetailPage, EditorPage, NotFoundPage } from './pages';
import ScrollButton from 'components/Button/ScrollButton';

function App() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.loading);

  const token = localStorage.getItem('jwt');

  const fetchCurrentUser = async () => {
    if (token) {
      const res = await axiosClient({
        url: '/user',
        method: 'GET',
        headers: { Authorization: `Token ${token}` },
      });
      return res.data.user as UserType;
    }
  };

  const { isLoading: isAuthLoading } = useQuery(['auth', token], fetchCurrentUser, {
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!token,
    onSuccess: (data) => {
      const { username, email, token, bio, image } = data!;
      dispatch(authActions.loginSuccess({ username, email, token, bio, image }));
      // console.log('1st login');
      const autoLogoutTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
        dispatch(authActions.logout());
      }, 600000);
      localStorage.setItem('autoLogoutTimer', JSON.stringify(autoLogoutTimer));
    },
    onError: (error) => {
      console.log('error');
      dispatch(authActions.loginFailed());
    },
  });

  if (isAuthLoading) {
    return <LoadingModal />;
  }

  return (
    <div
      className={`font-firasans ${
        authState.isAuthenticated ? 'mx-auto max-w-[96rem]' : ''
      } scroll-smooth`}
    >
      {isLoading && <LoadingModal />}

      <ScrollButton />

      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />

      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="/404" element={<NotFoundPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/editor">
          <Route
            index
            element={authState.isAuthenticated ? <EditorPage /> : <Navigate to="/login" />}
          />
          <Route
            path=":slug"
            element={authState.isAuthenticated ? <EditorPage /> : <Navigate to="/login" />}
          />
        </Route>

        <Route
          path="/profile/:username/settings"
          element={authState.isAuthenticated ? <Settings /> : <Navigate to="/login" />}
        />

        <Route path="" element={<Layout />}>
          <Route path="/home" element={<HomePage />} />

          <Route path="/article">
            <Route index element={<HomePage />} />
            <Route path=":slug" element={<ArticleDetailPage />} />
          </Route>

          <Route path="/profile/:username/*" element={<ProfilePage />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/404" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
