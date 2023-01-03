import React, { useState } from 'react';
import Tabs from './Tabs';

const Steps = () => {
  return (
    <div id='steps' className='w-full py-16 px-4 '>
      <div className='max-w-[1240px] mx-auto '>
        <div className='flex flex-col justify-center  text-center'>
          <p className='text-4xl md:text-5xl font-bold text-black mb-4'>
            How It Works
          </p>
          <h1 className='md:text-2xl text-lg font-semibold text-gray-600'>
            Explore the many different features and opportunities at your
            disposal.
          </h1>
        </div>
        <Tabs />
      </div>
    </div>
  );
};

export default Steps;
