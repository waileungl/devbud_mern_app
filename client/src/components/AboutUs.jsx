import React from 'react';
import willZhan from '../assets/will_zhan.jpg';
import willLiu from '../assets/will_liu.jpg';
import {
  AiOutlineGithub,
  AiFillLinkedin,
  AiOutlineGlobal,
  AiOutlineArrowUp,
} from 'react-icons/ai';
import { Link as LinkScroll } from 'react-scroll';

const AboutUs = () => {
  return (
    <div name='about' className='w-full pt-[9rem] px-4 relative'>
      <div className='max-w-[1240px] mx-auto px-2'>
        <h2 className='text-4xl md:text-5xl font-bold text-center'>
          Meet the Team
        </h2>
        <p className='text-lg md:text-2xl py-8 text-gray-600 text-center'>
          We are a team of self-taught developers. Our goal with DEVBUD. is to
          create a space where aspiring and beginner developers can network and
          work with experienced developers to improve their coding skills.
        </p>
        {/* <div className='grid md:grid-cols-2 gap-8 mt-10'> */}
        <div className='flex flex-col md:flex-row justify-center gap-12 mt-10'>
          {/* Individual Card  */}
          <div className='w-full md:w-1/3 shadow-xl flex flex-col p-4 my-4 rounded-lg bg-white hover:scale-105 duration-300'>
            <div className='w-48 h-48 mx-auto mt-[-3rem] rounded-xl object-cover truncate'>
              <img src={willZhan} alt='profile-pic' />
            </div>
            <h2 className='text-3xl font-bold text-center py-6'>
              William Zhan
            </h2>
            <p className='text-center text-lg mb-6'>
              I am a driven and dedicated full-stack developer with knowledge in
              HTML, CSS, JavaScript, React, MongoDB, Express, Node.js, Python,
              Flask, SQL, Bootstrap and TailwindCSS. I enjoy working with others
              to build web applications that capture my curiosity.
            </p>
            <div className='flex p-4 align-middle justify-center gap-10'>
              <a
                href='https://www.linkedin.com/in/william-zhan/'
                target='_blank'
              >
                <AiFillLinkedin className='text-3xl' />
              </a>
              <a href='https://github.com/williamzhanshum' target='_blank'>
                <AiOutlineGithub className='text-3xl' />
              </a>
              <a href='https://williamzhan.com' target='_blank'>
                <AiOutlineGlobal className='text-3xl' />
              </a>
            </div>
          </div>

          {/* Individual Card  */}
          <div className='w-full md:w-1/3 shadow-xl flex flex-col p-4 my-4 rounded-lg bg-white hover:scale-105 duration-300'>
            <div className='w-48 h-48 mx-auto mt-[-3rem] rounded-xl object-cover truncate'>
              <img src={willLiu} alt='profile-pic' />
            </div>
            <h2 className='text-3xl font-bold text-center py-6'>William Liu</h2>
            <p className='text-center text-lg mb-6'>
              I'm Will, a motivated and detail-oriented web developer with
              experience in building and maintaining websites and web
              applications. Mainly do MERN and Python Flask. I am eager to learn
              and develop any application that interests me.
            </p>
            <div className='flex p-4 align-middle justify-center gap-10'>
              <a href='https://www.linkedin.com/in/willliu06' target='_blank'>
                <AiFillLinkedin className='text-3xl' />
              </a>
              <a href='https://github.com/waileungl' target='_blank'>
                <AiOutlineGithub className='text-3xl' />
              </a>
              <a href='https://wlliu.com' target='_blank'>
                <AiOutlineGlobal className='text-3xl' />
              </a>
            </div>
          </div>
        </div>
        <div className='flex justify-center py-12'>
          <LinkScroll to='home' smooth={true} offset={0} duration={500}>
            <div className='rounded-full shadow-lg shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300 animate-bounce bg-white'>
              <AiOutlineArrowUp className='text-black' size={25} />
            </div>
          </LinkScroll>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
