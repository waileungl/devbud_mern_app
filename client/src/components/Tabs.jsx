import React, { useState } from 'react';
import collaborate from '../assets/collaborate.png';
import code from '../assets/code.png';
import networking from '../assets/networking.png';

const Tabs = () => {
  const [openTab, setOpenTab] = useState(1);

  const toggleTab = (i) => {
    setOpenTab(i);
  };

  return (
    <>
      <div className='flex flex-wrap mt-6 w-full'>
        <div className='w-9/12 mx-auto'>
          <ul
            className='flex mb-0 list-none flex-wrap pt-3 pb-4  flex-col md:flex-row'
            role='tablist'
          >
            <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
              <a
                className={
                  'text-s font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal mb-2 transition-bg-color duration-300' +
                  (openTab === 1
                    ? ' text-white bg-gray-600'
                    : ' text-gray-600 bg-white')
                }
                onClick={(e) => toggleTab(1)}
                data-toggle='tab'
                href='#link1'
                role='tablist'
              >
                CODE SPACE
              </a>
            </li>
            <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
              <a
                className={
                  'text-s font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal mb-2 transition-bg-color duration-300' +
                  (openTab === 2
                    ? ' text-white bg-gray-600'
                    : ' text-gray-600 bg-white')
                }
                onClick={(e) => toggleTab(2)}
                data-toggle='tab'
                href='#link2'
                role='tablist'
              >
                NETWORK
              </a>
            </li>
            <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
              <a
                className={
                  'text-s font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal mb-2 transition-bg-color duration-300' +
                  (openTab === 3
                    ? ' bg-gray-600 text-white'
                    : ' text-gray-600 bg-white')
                }
                onClick={(e) => toggleTab(3)}
                data-toggle='tab'
                href='#link3'
                role='tablist'
              >
                LEARN
              </a>
            </li>
          </ul>
          <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded -z-50'>
            <div className='px-4 py-5 flex-auto'>
              <div
                className={openTab === 1 ? 'grid md:grid-cols-2' : 'hidden'}
                id='#link1'
              >
                <img
                  className='w-[300px] mx-auto my-4'
                  src={collaborate}
                  alt='/'
                />
                <div className='flex flex-col justify-center'>
                  <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-sky-500'>
                    Collaborate with others in our Code Space
                  </h1>
                  <p className=''>
                    The Code Space allows you to work together on coding
                    assignments and projects with your colleagues. The built-in
                    compiler supports JavaScript, Java and Python.{' '}
                  </p>
                  <br />
                  <p>
                    Increase productivity and collaboration by using various
                    communication features like group video calls, group chats,
                    screen sharing and collaborative compiler.
                  </p>
                </div>
              </div>
              <div
                className={openTab === 2 ? 'grid md:grid-cols-2' : 'hidden'}
                id='#link2'
              >
                <img
                  className='w-[300px] mx-auto my-4'
                  src={networking}
                  alt='/'
                />
                <div className='flex flex-col justify-center'>
                  <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-sky-500'>
                    Network with other Developers
                  </h1>
                  <p className=''>
                    New to coding? DEVBUD's social platform allows users to
                    network with each other and find like-minded developers to
                    collaborate with.
                  </p>
                  <br />
                  <p>
                    Find more experienced developers that have the skills you
                    desire and work with them on projects to improve your coding
                    skills!{' '}
                  </p>
                </div>
              </div>
              <div
                className={openTab === 3 ? 'grid md:grid-cols-2' : 'hidden'}
                id='#link3'
              >
                <img className='w-[300px] mx-auto my-4' src={code} alt='/' />
                <div className='flex flex-col justify-center'>
                  <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-sky-500'>
                    Start Learning
                  </h1>
                  <p className=''>
                    Found someone you want to work with? There is nothing left
                    to do but jump into the Code Space.
                  </p>
                  <br />
                  <p>
                    DEVBUD comes with a built-in IDE where you and your
                    colleagues can work on projects or challenges together.
                    Simply create your own room and invite others!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
