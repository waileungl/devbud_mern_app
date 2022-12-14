import React, { useState } from 'react';
import Tabs from './Tabs';

const Steps = () => {
  return (
    <div id='steps' className='w-full py-16 px-4 '>
      <div className='max-w-[1240px] mx-auto '>
        <div className='flex flex-col justify-center  text-center'>
          <p className='md:text-5xl sm:text-4xl text-xlg font-bold text-black mb-4'>
            How It Works
          </p>
          <h1 className='md:text-2xl text-base font-semibold text-gray-600'>
            Start your journey and improve your skills in three simple steps.
          </h1>
        </div>
        <Tabs />
      </div>
    </div>
  );
};

export default Steps;
