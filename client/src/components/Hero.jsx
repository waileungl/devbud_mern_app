import React from 'react';
import Typed from 'react-typed';
import { Link, Routes, Route } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='' id='home'>
      <div className='max-w-[900px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        {/* <p className='font-bold p-1'>GROWING WITH OTHERS</p> */}
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold py-4 md:py-5'>
          Grow as a Developer
        </h1>
        <div className='flex justify-center items-center w-full'>
          <p className='md:text-5xl sm:text-4xl text-lg font-bold text-gray-400 '>
            Learn to code in&nbsp;
          </p>
          <Typed
            className='md:text-5xl sm:text-4xl text-lg font-bold text-gray-400 md:pl-4 pl-2'
            strings={['JavaScript', 'Python', 'Java']}
            typeSpeed={140}
            backSpeed={140}
            loop
          />
        </div>
        <p className='md:text-2xl text-base font-semibold text-gray-700 py-4'>
          Learn to code or improve your coding skills alongside experienced
          developers.
        </p>
        <Link to='/devs'>
          <button className='w-[200px] rounded-md font-medium my-4 mx-auto py-3  text-white border bg-black hover:bg-transparent hover:text-black hover:border-black '>
            Find a Developer
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
