import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Link as LinkScroll, animateScroll as scroll } from 'react-scroll';

const Navbar2 = () => {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 bg-[#F0F0F0] shadow-md sticky top-0 z-50'>
      {/* <h1 className='text-3xl font-bold mr-4 sm:text-4xl'>
        <Link>DEVBUD.</Link>rgb(240, 240, 240)
      </h1> */}
      <Link className='text-3xl font-bold mr-4 sm:text-4xl' to='/'>
        DEVBUD.
      </Link>
      <ul className='hidden md:flex'>
        {/* LINK W/ SMOOTH SCROLL  */}
        <LinkScroll
          to='steps'
          smooth={true}
          offset={-100}
          duration={500}
          className='p-4 hover:scale-105 nav-link'
        >
          How It Works
        </LinkScroll>
        <LinkScroll
          to='features'
          smooth={true}
          offset={0}
          duration={500}
          className='p-4 hover:scale-105 nav-link'
        >
          Features
        </LinkScroll>
        <LinkScroll
          to='about'
          smooth={true}
          offset={0}
          duration={500}
          className='p-4 hover:scale-105 nav-link'
        >
          About Us
        </LinkScroll>
        <Link to='/room'>
        <li className='p-4 hover:scale-105 nav-link'>Create Room</li>
        </Link>

        {/* --- Links W/O smooth scroll --- */}
        {/* <li className='p-4 hover:scale-105 nav-link'>How It Works</li>
        <li className='p-4 hover:scale-105 nav-link'>Features</li>
        <li className='p-4 hover:scale-105 nav-link'>About Us</li>
        <li className='p-4 hover:scale-105 nav-link'>Create Room</li> */}
      </ul>

      <div onClick={handleNav} className='block md:hidden'>
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div
        className={
          !nav
            ? 'fixed left-0 top-0 w-[60%] h-full border-r-gray-200 bg-[rgb(255,255,255)] ease-in-out duration-500'
            : 'fixed left-[-100%]'
        }
      >
        <h1 className='text-3xl font-bold mr-4 sm:text-4xl m-4 mb-2'>
          DEVBUD.
        </h1>
        <ul className=''>
          <li className='p-4 border-b nav-link'>How It Works</li>
          <li className='p-4 border-b nav-link'>Features</li>
          <li className='p-4 border-b nav-link'>About Us</li>
          <li className='p-4 border-b nav-link'>Create Room</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar2;
