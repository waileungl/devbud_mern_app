import React, { useRef } from 'react';
// import '../components/mainStyles/landingPage.css';

const SignupForm = () => {
  //   const emailInput = useRef(null);

  return (
    <>
      {/* <form> */}
      <div className='text-center py-4'>
        <h2 className='text-2xl md:text-3xl font-bold'>Hello There!</h2>
        <p className='text-sm md:text-lg text-gray-600'>
          Please create an account.
        </p>
      </div>
      <hr className='mb-4' />

      {/* Form inputs */}
      <div>
        <div className='mb-3'>
          <label className='font-normal text-gray-600' for='profilePic'>
            Email
          </label>
          <input
            required
            minLength={5}
            className='border border-grey-400 block py-2 px-4 w-full rounded '
            type='text'
            name='profilePic'
            // onFocus={() => emailInput.current.classList.add('active')}
            // onBlur={(e) => {
            //   if (e.target.value !== '') return;
            //   emailInput.current.classList.remove('active');
            // }}
            // ref={emailInput}

            // value={profilePic}
            // onChange={(e) => setProfilePic(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='font-normal text-gray-600' for='profilePic'>
            Password
          </label>
          <input
            required
            className='border border-grey-400 block py-2 px-4 w-full rounded'
            type='password'
            name='profilePic'
            // value={profilePic}
            // onChange={(e) => setProfilePic(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='font-normal text-gray-600' for='profilePic'>
            Confirm Password
          </label>
          <input
            required
            className='border border-grey-400 block py-2 px-4 w-full rounded'
            type='password'
            name='profilePic'
            // value={profilePic}
            // onChange={(e) => setProfilePic(e.target.value)}
          />
        </div>
      </div>
      {/* </form> */}
    </>
  );
};

export default SignupForm;
