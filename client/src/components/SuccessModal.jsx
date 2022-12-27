import React, { useEffect } from 'react';
import success from "../assets/success-animation.gif"

const SuccessModal = ({ openSuccessModal, setOpenSuccessModal, welcomeWords }) => {

  useEffect(() => {
    const successAnimation = setTimeout(() => {
      setOpenSuccessModal(false);
    }, 1700);
    return () => clearTimeout(successAnimation);
  }, [])

  if (!openSuccessModal) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 shadow-xl'
    >
      <div
        className=' w-full md:w-3/4 lg:w-1/3 shadow-xl flex flex-col p-2 my-4 rounded-lg bg-white'
      >
        <div className='flex justify-between'>
        </div>
        <div className='text-center pt-6'>
          <h2 className='text-2xl md:text-3xl'>{welcomeWords}</h2>
          <img src={success} alt="Success animation" className='mx-auto' />
        </div>

      </div>
    </div>
  );
};

export default SuccessModal;
