import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import NavAuth from './Nav/NavAuth';
import NavDefault from './Nav/NavDefault';

function Layout() {
  const authState = useAppSelector((state) => state.auth);

  return (
    <div className={`${authState.isAuthenticated ? 'flex' : ''} `}>
      <header
        className={`${
          authState.isAuthenticated && 'mr-8 sm:mr-14 lg:mr-[9.5rem] md:mr-16  xl:mr-[9rem]'
        } `}
      >
        {authState.isAuthenticated === false ? <NavDefault /> : <NavAuth />}
      </header>
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
