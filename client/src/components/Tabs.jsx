import React, { useState } from 'react';
import Find from '../assets/find.jpg';
import Chat from '../assets/chat.jpg';
import Code from '../assets/code.jpg';

const Tabs = () => {
  const [openTab, setOpenTab] = useState(1);

  const toggleTab = (i) => {
    setOpenTab(i);
  };

  return (
    <>
      <div className='flex flex-wrap mt-6 '>
        <div className='w-9/12 mx-auto'>
          <ul
            className='flex mb-0 list-none flex-wrap pt-3 pb-4  flex-col md:flex-row'
            role='tablist'
          >
            <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
              <a
                className={
                  'text-s font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal mb-2' +
                  (openTab === 1
                    ? ' text-white bg-gray-600'
                    : ' text-gray-600 bg-white')
                }
                onClick={(e) => toggleTab(1)}
                data-toggle='tab'
                href='#link1'
                role='tablist'
              >
                01 PICK
              </a>
            </li>
            <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
              <a
                className={
                  'text-s font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal mb-2' +
                  (openTab === 2
                    ? ' text-white bg-gray-600'
                    : ' text-gray-600 bg-white')
                }
                onClick={(e) => toggleTab(2)}
                data-toggle='tab'
                href='#link2'
                role='tablist'
              >
                02 CHAT
              </a>
            </li>
            <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
              <a
                className={
                  'text-s font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal mb-2' +
                  (openTab === 3
                    ? ' bg-gray-600 text-white'
                    : ' text-gray-600 bg-white')
                }
                onClick={(e) => toggleTab(3)}
                data-toggle='tab'
                href='#link3'
                role='tablist'
              >
                03 LEARN
              </a>
            </li>
          </ul>
          <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded -z-50'>
            <div className='px-4 py-5 flex-auto'>
              <div
                className={openTab === 1 ? 'grid md:grid-cols-2' : 'hidden'}
                id='#link1'
              >
                <img className='w-[300px] mx-auto my-4' src={Find} alt='/' />
                <div className='flex flex-col justify-center'>
                  <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-sky-500'>
                    Pick Your Instructor
                  </h1>
                  <p className=''>
                    Find the instructors that best meet your needs. Look for the
                    instructors that know the languages you want to learn.
                  </p>
                </div>
              </div>
              <div
                className={openTab === 2 ? 'grid md:grid-cols-2' : 'hidden'}
                id='#link2'
              >
                <img className='w-[300px] mx-auto my-4' src={Chat} alt='/' />
                <div className='flex flex-col justify-center'>
                  <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-sky-500'>
                    Chat With Your Instructor
                  </h1>
                  <p className=''>
                    When you find an instructor you'd like to work with, send
                    them a message right from our site. Messaging is easy and
                    instant.
                  </p>
                </div>
              </div>
              <div
                className={openTab === 3 ? 'grid md:grid-cols-2' : 'hidden'}
                id='#link3'
              >
                <img className='w-[300px] mx-auto my-4' src={Code} alt='/' />
                <div className='flex flex-col justify-center'>
                  <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-sky-500'>
                    Start Learning
                  </h1>
                  <p className=''>
                    Found someone you want to work with? There is nothing left
                    to do but jump to our work room and start coding!
                  </p>
                  <br />
                  <p>
                    DEVBUD comes with a built-in IDE where you and your
                    instructor can work on projects or challenges together. Each
                    work room comes with group chat and webcam features to make
                    communication a breeze.
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
