import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateFormModal from './CreateFormModal';

export const NavBar3 = ({ loaded, setLoaded }) => {
  const [openModal, setOpenModal] = useState(false);
  // const [nav, setNav] = useState(true);

  // const handleNav = () => {
  //   setNav(!nav);
  // };

  return (
    <>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 bg-[#F0F0F0] shadow-md sticky top-0 z-50'>
        <Link className='text-3xl font-bold mr-4 sm:text-4xl' to='/'>
          DEVBUD.
        </Link>
        <ul className='flex'>
          <button
            onClick={() => {
              setOpenModal(!openModal);
            }}
            className='rounded-md px-8 py-2 text-black border border-black transparent hover:bg-black hover:text-white hover:border-black'
          >
            Become a Tutor
          </button>
        </ul>
      </div>

      <CreateFormModal
        loaded={loaded}
        setLoaded={setLoaded}
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </>
  );
};
