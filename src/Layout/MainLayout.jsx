import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../Components/Loading';

const MainLayout = () => {
   const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loading></Loading>
  }
    return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar></Navbar>
      </header>
      <main className='flex-1'>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;