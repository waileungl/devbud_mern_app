import React from 'react';
// import axios from 'axios';
import DevCard from './DevCard';
import { Link } from 'react-router-dom'

//Filter language icon
import { SiPython } from 'react-icons/si';
import { SiJavascript } from 'react-icons/si';
import { SiJava } from 'react-icons/si';
import { IoMdArrowBack } from 'react-icons/io';

const DevList = ({ devs, loaded, findDevsByLanguage, showAllDevs, loadImg }) => {
  return (
    <div>
      <div className='flex justify-between items-end h-14 max-w-[1240px] mx-auto px-4 bg-[#F0F0F0] mb-[-50px]'>
        <Link className='rounded-md px-4 py-1 text-sm md:text-base md:px-8 md:py-2 text-black border border-black transparent hover:bg-black hover:text-white hover:border-black' to='/'>
        <IoMdArrowBack className='flex text-[1.3rem] lg:hidden' title='Back Home'/> <span className='hidden lg:flex'>Back</span>
        </Link>

        <ul className='flex w-[65%] h-[100%] justify-between items-end gap-2'>
          <button onClick={() => showAllDevs()} className='flex justify-center items-center rounded-md px-3 py-2 text-xs md:text-sm md:px-4 md:py-2 text-black bg-slate-200 transparent hover:bg-black hover:text-white hover:border-black w-[130px]'>
          <span className='flex text-[1rem] lg:hidden' title='show all'>All</span><span className='hidden lg:flex'>Show All</span>
          </button>
          <button onClick={() => findDevsByLanguage('javaScript')} className='flex justify-center items-center rounded-md px-2 py-2 text-xs md:text-sm md:px-4 md:py-2 text-black bg-slate-200 transparent hover:bg-black hover:text-white hover:border-black'>
            <SiJavascript className='flex text-[1.3rem] lg:hidden' title='JavaScript'/> <span className='hidden lg:flex'>JavaScript</span>
          </button>
          <button onClick={() => findDevsByLanguage('python')} className='flex justify-center items-center rounded-md px-2 py-2 text-xs md:text-sm md:px-4 md:py-2 text-black bg-slate-200 transparent hover:bg-black hover:text-white hover:border-black'>
            <SiPython className='flex text-[1.3rem] lg:hidden' title='Python'/> <span className='hidden lg:flex'>Python</span>
          </button>
          <button onClick={() => findDevsByLanguage('java')} className='flex justify-center items-center rounded-md px-2 py-2 text-xs md:text-sm md:px-4 md:py-2 text-black bg-slate-200 transparent hover:bg-black hover:text-white hover:border-black mr-[20%]'>
            <SiJava className='flex text-[1.3rem] lg:hidden' title='Java'/> <span className='hidden lg:flex'>Java</span>
          </button>
        </ul>
      </div>

      <div className='w-full py-12 px-4'>
        {/* <hr className='max-w-[1240px] mx-auto'/> */}
        <div
          className='max-w-[1240px] mx-auto flex flex-col'
          id='cards-container'
        >
          {devs.map((oneDev, idx) => (
            <DevCard oneDev={oneDev} key={idx} loaded={loaded} loadImg={loadImg}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevList;
