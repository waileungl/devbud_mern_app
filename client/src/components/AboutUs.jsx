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
            <div className='w-48 h-48 mx-auto mt-[-3rem] rounded-xl object-cover truncate'>
              <img
                src={willZhan}
                alt='profile-pic'
              />
            </div>
            <h2 className='text-3xl font-bold text-center py-6'>
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
              <a href='https://github.com/williamzhanshum'>
                <AiOutlineGithub className='text-3xl' />
              </a>
              <a href='#'>
                <AiOutlineGlobal className='text-3xl' />
              </a>
            </div>
          </div>

          {/* Individual Card  */}
          <div className='w-full md:w-1/3 shadow-xl flex flex-col p-4 my-4 rounded-lg bg-white hover:scale-105 duration-300'>
            <div className='w-48 h-48 mx-auto mt-[-3rem] rounded-xl object-cover truncate'>
              <img
                src={willLiu}
                alt='profile-pic'
              />
            </div>
            <h2 className='text-3xl font-bold text-center py-6'>William Liu</h2>
            <p className='text-center text-lg mb-6'>
              I'm Will, a motivated and detail-oriented web developer with experience in building and maintaining websites and web applications. Mainly do MERN and Python Flask. I am eager to learn and develop any application that interests me.
            </p>
            <div className='flex p-4 align-middle justify-center gap-10'>
              <a href='https://www.linkedin.com/in/willliu06'>
                <AiFillLinkedin className='text-3xl' />
              </a>
              <a href='https://github.com/waileungl'>
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
