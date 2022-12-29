import React, { useEffect, useState } from 'react';
import defaultPic from '../assets/default-profile-icon.png';
import { storage } from '../firebase';
import { ref, getDownloadURL  } from 'firebase/storage';

const DevModal = ({ handleClose, oneDev, loaded }) => {
  // console.log('HERE IS ID:', theDevId);
  const [profilePic, setProfilePic] = useState("")

  useEffect(() => {
    console.log("Onedev profilepic here>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", oneDev.profilePic);
    getDownloadURL(ref(storage, `user-profile-pic/${oneDev.profilePic}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        console.log("firebase img url here>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", url);
        setProfilePic(url)
      })
      .catch((error) => {
        console.log(error)
        // alert("error occur!")
      });
  }, [loaded])


  return (
    <div
      onClick={handleClose}
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50'
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='max-w-full md:w-3/4 lg:w-[40%] shadow-xl flex flex-col p-4 my-4 rounded-lg bg-white'
      >
        <img
          className='w-40 mx-auto mt-[-1.5rem] md:mt-[-3rem] rounded-xl object-cover'
          src={profilePic === '' ? defaultPic : profilePic}
          alt='profile-pic'
        />
        <h2 className='text-3xl font-bold text-center py-2 md:py-4 md:mt-4 overflow-auto'>
          {oneDev.firstName + ' ' + oneDev.lastName}
        </h2>

        <div className='px-10 align-middle'>
          <div className='grid grid-cols-2 2xl:grid-cols-3 text-lg mb-2 2xl:mb-4 h-1/3 '>
            <p className='text-sm md:text-lg font-semibold'>Description</p>
            <p className='text-sm md:text-lg max-h-[150px] col-span-2 break-words overflow-auto'>
              {oneDev.bio}
            </p>
          </div>

          <div className='grid grid-cols-2 2xl:grid-cols-3 text-lg mb-2 2xl:mb-4'>
            <p className='text-sm md:text-lg font-semibold'>Languages</p>
            <p className='text-sm md:text-lg col-span-2'>
              {' '}
              {oneDev.javaScript ? <span className="bg-slate-200 px-2 py-0.5 rounded-lg text-xs">JavaScript</span> : ''}{' '}
              {oneDev.python ? <span className="bg-slate-200 px-2 py-0.5 rounded-lg text-xs">Python</span> : ''} {oneDev.java ? <span className="bg-slate-200 px-2 py-0.5 rounded-lg text-xs">Java</span> : ''}
            </p>
          </div>

          <div className='grid grid-cols-2 2xl:grid-cols-3 text-lg mb-2 2xl:mb-4'>
            <p className='text-sm md:text-lg font-semibold'>Experience</p>
            <p className='text-sm md:text-lg col-span-2'>{`${oneDev.yearsOfExp} years`}</p>
          </div>

          <div className='grid grid-cols-2 2xl:grid-cols-3 text-lg mb-2 2xl:mb-4 overflow-auto'>
            <p className='text-sm md:text-lg font-semibold'>Education</p>
            <p className='text-sm md:text-lg col-span-2'>
              {oneDev.education ? oneDev.education : 'N/A'}
            </p>
          </div>

          <div className='flex md:p-4 align-middle justify-center gap-10'>
            <button
              onClick={handleClose}
              className='rounded-md px-8 py-2 text-white border bg-black hover:bg-transparent hover:text-black hover:border-black'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevModal;
