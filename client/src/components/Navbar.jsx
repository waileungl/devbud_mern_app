import React, { useState } from 'react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className='w-screen h-[80px] z-10 bg-zinc-200 fixed top-0 drop-shadow-lg'>
      <div className='px-2 flex justify-between items-center w-full h-full'>
        <div className='flex items-center'>
          <h1 className='text-3xl font-bold mr-4 sm:text-4xl'>DEVBUD.</h1>
          <ul className='hidden md:flex'>
            <li>
              <a href='#'>How It Works</a>
            </li>
            <li>
              <a href='#'>Features</a>
            </li>
            <li>
              <a href='#'>Compiler</a>
            </li>
            <li>
              <a href='#'>About Us</a>
            </li>
          </ul>
        </div>
        <div className='hidden md:flex pr-4'>
          <button className='border-none bg-transparent text-black mr-4'>
            Log In
          </button>
          <button className='px-8 py-3'>Sign Up</button>
        </div>
        <div className='md:hidden' onClick={handleClick}>
          {!nav ? <Bars3Icon className='w-7' /> : <XMarkIcon className='w-7' />}
        </div>
      </div>

      <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
        <li className='border-b-2 border-zinc-300 w-full'>
          <a href='#'>How It Works</a>
        </li>
        <li className='border-b-2 border-zinc-300 w-full'>
          <a href='#'>Features</a>
        </li>
        <li className='border-b-2 border-zinc-300 w-full'>
          <a href='#'>Compiler</a>
        </li>
        <li className='border-b-2 border-zinc-300 w-full'>
          <a href='#'>About Us</a>
        </li>
        <div className='flex flex-col my-4'>
          <button className='bg-transparent text-sky-600 px-8 py-3 mb-4'>
            Log In
          </button>
          <button className='px-8 py-3'>Sign Up</button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
