import React from 'react';
// import axios from 'axios';
import DevCard from './DevCard';
import { Link } from 'react-router-dom'


const DevList = ({ devs, loaded }) => {
  return (
    <div>
      <div className='flex justify-between items-end h-14 max-w-[1240px] mx-auto px-4 bg-[#F0F0F0] mb-[-50px]'>
          <Link className='rounded-md px-4 py-1 text-sm md:text-base md:px-8 md:py-2 text-black border border-black transparent hover:bg-black hover:text-white hover:border-black' to='/'>
            Back
          </Link>
          <div className='w-[60%] h-[100%]'></div>
      </div>
      
      <div className='w-full py-12 px-4'>
      {/* <hr className='max-w-[1240px] mx-auto'/> */}
        <div
          className='max-w-[1240px] mx-auto flex flex-col'
          id='cards-container'
        >
          {devs.map((oneDev, idx) => (
            <DevCard oneDev={oneDev} key={idx} loaded={loaded}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevList;
