import React, { useState } from 'react';
import defaultPic from '../assets/default-profile-icon.png';
import DevModal from './DevModal';

const DevCard = (props) => {
  const { oneDev } = props;

  const [openModal, setOpenModal] = useState(false);
  // const [open, setOpen] = useState(false);

  return (
    <>
      <div className='md:w-[700px] w-[80%] bg-white mx-auto my-6 p-10 rounded-xl shadow-xl relative md:pl-60 pt-52 md:pt-10 mt-14 md:mt-6 hover:scale-105 ease-out duration-500 '>
        <div className='absolute md:-left-8 left-0 md:h-full md:top-0 -top-8 md:w-[250px] flex items-center justify-center w-full'>
          <img
            className='rounded-xl shadow-lg w-[90%] h-52 object-cover'
            src={oneDev.profilePic === '' ? defaultPic : oneDev.profilePic}
            //   src={oneDev.profilePic}
          />
        </div>
        <h1 className='md:text-4xl text-3xl font-semibold'>
          {oneDev.firstName + ' ' + oneDev.lastName}
        </h1>
        <p className=' mt-4 leading-loose text-sm text-gray-500'>
          {oneDev.bio}
        </p>
        <p className=' text-gray-500'>
          <span className='font-extrabold text-black'>Languages:</span>{' '}
          {oneDev.javaScript ? 'JavaScript |' : ''}{' '}
          {oneDev.python ? 'Python |' : ''} {oneDev.java ? 'Java |' : ''}{' '}
          {oneDev.cSharp ? 'C#' : ''}
        </p>

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
