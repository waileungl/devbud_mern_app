import React from 'react';
import DefaultPic from '../assets/default-profile-icon.png';
import willZhan from '../assets/will_zhan.jpg';
import willLiu from '../assets/will_liu.jpg';
import {
  AiOutlineGithub,
  AiFillLinkedin,
  AiOutlineGlobal,
} from 'react-icons/ai';

const AboutUs = () => {
  return (
    <div name='about' className='w-full py-[9rem] px-4'>
      <div className='max-w-[1240px] mx-auto px-2'>
        <h2 className='text-4xl md:text-5xl font-bold text-center'>
          Meet the Team
        </h2>
        <p className='text-lg md:text-2xl py-8 text-gray-600 text-center'>
          We are a team of self-taught developers. Our goal with DEVBUD. is to
          create a space where aspiring and beginner developers can network and
          work with experienced developers to imporve their coding skills.
        </p>
        {/* <div className='grid md:grid-cols-2 gap-8 mt-10'> */}
        <div className='flex flex-col md:flex-row justify-center gap-12 mt-10'>
          {/* Individual Card  */}
          <div className='w-full md:w-1/3 shadow-xl flex flex-col p-4 my-4 rounded-lg bg-white hover:scale-105 duration-300'>
            <img
              className='w-40 mx-auto mt-[-3rem] rounded-xl object-cover'
              src={willZhan}
              alt='profile-pic'
            />
            <h2 className='text-3xl font-bold text-center py-8'>
              William Zhan
            </h2>
            <p className='text-center text-lg mb-6'>
              I am a full-stack developer with knowledge in HTML, CSS,
              JavaScript, React, MongoDB, Express, Node.js, Python, Flask, SQL,
              Bootstrap and TailwindCSS.
            </p>
            <div className='flex p-4 align-middle justify-center gap-10'>
              <a href='https://www.linkedin.com/in/william-zhan/'>
                <AiFillLinkedin className='text-3xl' />
              </a>
              <a href='#'>
                <AiOutlineGithub className='text-3xl' />
              </a>
              <a href='#'>
                <AiOutlineGlobal className='text-3xl' />
              </a>
            </div>
          </div>

          {/* Individual Card  */}
          <div className='w-full md:w-1/3 shadow-xl flex flex-col p-4 my-4 rounded-lg bg-white hover:scale-105 duration-300'>
            <img
              className='w-40 mx-auto mt-[-3rem] rounded-xl object-cover'
              src={willLiu}
              alt='profile-pic'
            />
            <h2 className='text-3xl font-bold text-center py-8'>William Liu</h2>
            <p className='text-center text-lg mb-6'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex labore
              minus magni quod molestias autem voluptatem officia recusandae
              qui. Aliquid minima et iusto excepturi quod libero, voluptatem
              facilis qui magnam!
            </p>
            <div className='flex p-4 align-middle justify-center gap-10'>
              <a href='#'>
                <AiFillLinkedin className='text-3xl' />
              </a>
              <a href='#'>
                <AiOutlineGithub className='text-3xl' />
              </a>
              <a href='#'>
                <AiOutlineGlobal className='text-3xl' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
