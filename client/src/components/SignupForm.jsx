import React, { useRef } from 'react';
// import '../components/mainStyles/landingPage.css';

const SignupForm = ({
  email,
  password,
  confirmPass,
  setConfirmPass,
  updateFields,
}) => {
  //   const emailInput = useRef(null);

  console.log(password, confirmPass);

  return (
    <>
      {/* <form> */}
      <div className='text-center py-4'>
        <h2 className='text-2xl md:text-3xl font-bold'>Hello There!</h2>
        <p className='text-sm md:text-lg text-gray-600'>
          Please create an account.
        </p>
      </div>
      {/* <hr className='mb-4' /> */}

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
            name='email'
            value={email}
            onChange={(e) => updateFields({ email: e.target.value })}
            // onFocus={() => emailInput.current.classList.add('active')}
            // onBlur={(e) => {
            //   if (e.target.value !== '') return;
            //   emailInput.current.classList.remove('active');
            // }}
            // ref={emailInput}
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
            name='password'
            value={password}
            onChange={(e) => updateFields({ password: e.target.value })}
          />
        </div>

        <div className='mb-3'>
          <label className='font-normal text-gray-600' for='profilePic'>
            Confirm Password
          </label>
          <input
            required
            className='border border-grey-400 block py-2 px-4 w-full rounded '
            type='password'
            name='confirmPassword'
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          {password !== confirmPass ? (
            <div className='text-red-500 text-sm'>Passsword does not match</div>
          ) : (
            <div> </div>
          )}
        </div>
      </div>
      {/* </form> */}
    </>
  );
};

export default SignupForm;
