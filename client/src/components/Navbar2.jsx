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
      <Link className='text-3xl font-bold mr-4 sm:text-4xl' to='/'>
        <LinkScroll to='home' smooth={true} offset={0} duration={500}>
          DEVBUD.
        </LinkScroll>
      </Link>
      <div className='flex items-center'>
        <ul className='hidden mr-4 md:flex'>
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
            offset={-30}
            duration={500}
            className='p-4 hover:scale-105 nav-link'
          >
            Features
          </LinkScroll>
          <LinkScroll
            to='about'
            smooth={true}
            offset={40}
            duration={500}
            className='p-4 hover:scale-105 nav-link'
          >
            About Us
          </LinkScroll>
        </ul>
        <Link to='/room'>
          {/* <li className='p-4 hover:scale-105 nav-link'>Create Room</li> */}
          <button className='hidden md:flex rounded-md px-8 py-2 text-white border border-black bg-black hover:bg-transparent hover:text-black hover:border-black'>
            Code Space
          </button>
        </Link>
      </div>

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
        <LinkScroll to='home' smooth={true} offset={0} duration={500}>
          <h1 className='text-3xl font-bold mr-4 sm:text-4xl m-4 mb-2'>
            DEVBUD.
          </h1>
        </LinkScroll>
        <ul>
          <LinkScroll to='steps' smooth={true} offset={-100} duration={500}>
            <li onClick={handleNav} className='p-4 border-b nav-link'>
              How It Works
            </li>
          </LinkScroll>
          <LinkScroll to='features' smooth={true} offset={-30} duration={500}>
            <li onClick={handleNav} className='p-4 border-b nav-link'>
              Features
            </li>
          </LinkScroll>
          <LinkScroll to='about' smooth={true} offset={40} duration={500}>
            <li onClick={handleNav} className='p-4 border-b nav-link'>
              About Us
            </li>
          </LinkScroll>
          <Link to='/room'>
            {/* <li className='p-4 border-b nav-link'>Code Space</li> */}
            <div className='w-[100%] flex justify-center items-center'>
              <button className='my-4 md:flex rounded-md px-8 py-2 text-white border border-black bg-black hover:bg-transparent hover:text-black hover:border-black'>
                Create Code Space
              </button>
            </div>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar2;
