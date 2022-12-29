import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

export const NavBar3 = ({
  openModal,
  setOpenModal,
  openLoginModal,
  setOpenLoginModal,
  loginToken,
  setLoginToken,
  openEditProfileModal,
  setOpenEditProfileModal,
}) => {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 bg-[#F0F0F0] shadow-md sticky top-0 z-50'>
        <Link className='text-3xl font-bold mr-4 sm:text-4xl' to='/'>
          DEVBUD.
        </Link>
        {!loginToken && (
          <ul className='hidden md:flex'>
            <button
              onClick={() => {
                setOpenModal(!openModal);
              }}
              className='rounded-md px-8 py-2 text-white bg-black border border-black transparent hover:bg-[#F0F0F0] hover:text-black hover:border-black'
            >
              Become a Tutor
            </button>
            <button
              onClick={() => {
                setOpenLoginModal(!openLoginModal);
              }}
              className='rounded-md px-8 py-2 text-black border border-black transparent hover:bg-black hover:text-white hover:border-black ml-2'
            >
              Login
            </button>
          </ul>
        )}
        {loginToken && (
          <ul className='hidden md:flex'>
            <button
              onClick={() => {
                setOpenEditProfileModal(!openEditProfileModal);
              }}
              className='rounded-md px-8 py-2 text-white bg-slate-800 border border-black transparent hover:bg-[#F0F0F0] hover:text-black hover:border-black'
            >
              My Profile
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('jwt');
                setLoginToken('');
              }}
              className='rounded-md px-8 py-2 text-black border border-black transparent hover:bg-black hover:text-white hover:border-black ml-2'
            >
              Logout
            </button>
          </ul>
        )}

        <div onClick={handleNav} className='block md:hidden'>
          {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div
          onClick={handleNav}
          className={
            !nav
              ? 'fixed left-0 top-0 w-[60%] h-full border-r-gray-200 bg-[rgb(255,255,255)] ease-in-out duration-500'
              : 'fixed left-[-100%]'
          }
        >
          <Link to='/'>
            <h2 className='text-3xl font-bold mr-4 sm:text-4xl m-4 mb-2'>
              DEVBUD.
            </h2>
          </Link>
          {loginToken && (
            <ul>
              <li
                onClick={() => {
                  setOpenEditProfileModal(!openEditProfileModal);
                }}
                className='p-4 border-b nav-link'
              >
                My Profile
              </li>

              <li
                onClick={() => {
                  localStorage.removeItem('jwt');
                  setLoginToken('');
                }}
                className='p-4 border-b nav-link'
              >
                Logout
              </li>
              <Link to='/room'>
                {/* <li className='p-4 border-b nav-link'>Code Space</li> */}
                <div className='w-[100%] flex justify-center items-center'>
                  <button className='my-4 md:flex rounded-md px-8 py-2 text-white border border-black bg-black hover:bg-transparent hover:text-black hover:border-black'>
                    Code Space
                  </button>
                </div>
              </Link>
            </ul>
          )}

          {!loginToken && (
            <ul>
              <li
                onClick={() => {
                  setOpenModal(!openModal);
                }}
                className='p-4 border-b nav-link'
              >
                Become a Tutor
              </li>

              <li
                onClick={() => {
                  setOpenLoginModal(!openLoginModal);
                }}
                className='p-4 border-b nav-link'
              >
                Login
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
