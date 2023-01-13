import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div name='features' className='w-full py-24 mt-32'>
      <div className='max-w-[1240px] mx-auto px-2'>
        <h2 className='text-4xl md:text-5xl font-bold text-center'>
          All-In-One Platform
        </h2>
        <p className='text-lg md:text-2xl py-8 text-gray-600 text-center'>
          DEVBUD. is an All-In-One platform that allows instructors and students
          to maximize their learning effort and use their time more efficiently.
          Below is a list of all the features that users have access to.
        </p>

        {/* Cards container */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
          {/* Individual Cards */}
          <div className='flex shadow-xl pt-4'>
            <div>
              <AiOutlineCheck className='w-7 mr-4 text-green-600 font-bold text-2xl' />
            </div>
            <div>
              <h3 className='font-bold text-lg'>Built-in IDE</h3>
              <p className='text-lg pt-2 pb-4 pr-4'>
                Practice your coding skills or work together with others on our
                built-in IDE, which supports JavaScript, Python and Java.{' '}
              </p>
            </div>
          </div>

          {/* Individual Cards */}
          <div className='flex shadow-xl pt-4'>
            <div>
              <AiOutlineCheck className='w-7 mr-4 text-green-600 font-bold text-2xl' />
            </div>
            <div>
              <h3 className='font-bold text-lg'>Group Video</h3>
              <p className='text-lg pt-2 pb-4'>
                Get to know your instructor or students through video calls that
                support one-on-one or groups.
              </p>
            </div>
          </div>

          {/* Individual Cards */}
          <div className='flex shadow-xl pt-4'>
            <div>
              <AiOutlineCheck className='w-7 mr-4 text-green-600 font-bold text-2xl' />
            </div>
            <div>
              <h3 className='font-bold text-lg'>Group Chat App</h3>
              <p className='text-lg pt-2 pb-4'>
                Not a fan of video chat? No problem, communicate with your
                instructor or students through the chat app in the code space.
              </p>
            </div>
          </div>

          {/* Individual Cards */}
          <div className='flex shadow-xl pt-4'>
            <div>
              <AiOutlineCheck className='w-7 mr-4 text-green-600 font-bold text-2xl' />
            </div>
            <div>
              <h3 className='font-bold text-lg'>Share Screen</h3>
              <p className='text-lg pt-2 pb-4 mr-1'>
                Share your screen with colleagues to enhance your communication
                and collaboration.
              </p>
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <Link
            to='/room'
            className='mx-auto md:flex rounded-md  mt-10 px-8 py-2 text-white border border-black bg-black hover:bg-transparent hover:text-black hover:border-black'
          >
            Try it now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
