import React from 'react';
import { Link } from 'react-router-dom';
export const NavBarNotFound = () => {
  return (
    <>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 bg-[#F0F0F0] shadow-md sticky top-0 z-50'>
        <Link className='text-3xl font-bold mr-4 sm:text-4xl' to='/'>
          DEVBUD.
        </Link>
      </div>
    </>
  );
};
