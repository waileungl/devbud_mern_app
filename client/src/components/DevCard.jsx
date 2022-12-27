import React, { useState } from 'react';
import defaultPic from '../assets/default-profile-icon.png';
import DevModal from './DevModal';

const DevCard = (props) => {
  const { oneDev } = props;

  const [openModal, setOpenModal] = useState(false);

  console.log("onedevhere", oneDev);
  return (
    <>
      <div className=' md:w-[700px] w-[100%] bg-white mx-auto my-6 p-10 rounded-xl shadow-xl relative md:pl-60 pt-52 md:pt-10 mt-14 md:mt-6 hover:scale-105 ease-out duration-500 '>
        <div className='absolute md:-left-8 left-0 md:h-full md:top-0 -top-8 md:w-[250px] flex items-center justify-center w-full'>
          <img
            className='w-[70%] rounded-xl shadow-lg md:w-[90%] h-52 object-cover max-h-[85%]'
            src={oneDev.profilePic === '' ? defaultPic : oneDev.profilePic}
            alt='profile-pic'
          //   src={oneDev.profilePic}
          />
        </div>
        <div>
          <h1 className='md:text-4xl text-3xl font-semibold'>
            {oneDev.firstName + ' ' + oneDev.lastName}
          </h1>

          <p className='text-gray-500 my-3'>
            <span className='font-extrabold text-black'>Languages:</span>{' '}
            {oneDev.javaScript ? 'JavaScript |' : ''}{' '}
            {oneDev.python ? 'Python |' : ''} {oneDev.java ? 'Java |' : ''}{' '}
            {oneDev.cSharp ? 'C#' : ''}
          </p>

          <p className='text-gray-500 my-3'>
            <span className='font-extrabold text-black'>Experience: </span>
            {oneDev.yearsOfExp} years
          </p>
        </div>

        <div className='flex gap-5 mt-4 flex-col md:flex-row'>
          <button
            onClick={() => {
              setOpenModal(!openModal);
            }}
            className='rounded-md px-8 py-2 text-white border bg-black hover:bg-transparent hover:text-black hover:border-black'
          >
            View Details
          </button>
          {/* <button className='rounded-md px-8 py-2 border border-black bg-transparent hover:bg-black hover:text-white'>
          Message me
        </button> */}
        </div>
      </div>

      {openModal && (
        <DevModal oneDev={oneDev} handleClose={() => setOpenModal(false)} />
      )}
    </>
  );
};

export default DevCard;
