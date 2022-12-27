import React, { useState } from 'react';
import axios from 'axios';


const SignupForm = ({
  email,
  password,
  confirmPass,
  setConfirmPass,
  updateFields,
  setFormValid
}) => {
  const [emailValidWarn, setEmailValidWarn] = useState(false)


  const emailValidation = (email) => {
    const emailToCheck = { email: `${email}`}
    axios
    .post('http://localhost:8000/api/register', emailToCheck)
    .then((res) => {
      if(res.data.exist){
        setFormValid(false)
        setEmailValidWarn(true)
      }else{
        setFormValid(true)
        setEmailValidWarn(false)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <div className='text-center py-4'>
        <h2 className='text-2xl md:text-3xl font-bold'>Hello There!</h2>
        <p className='text-sm md:text-lg text-gray-600'>
          Please create an account.
        </p>
      </div>
      <div>
        <div className='mb-3'>
          <label className='font-normal text-gray-600' for='profilePic'>
            Email
          </label>
          <input
            required
            minLength={5}
            placeholder='Email address here'
            className='border border-grey-400 block py-2 px-4 w-full rounded '
            type='text'
            name='email'
            value={email}
            onChange={(e) => { updateFields({ email: e.target.value }); emailValidation(e.target.value) }}
          // onFocus={() => emailInput.current.classList.add('active')}
          // onBlur={(e) => {
          //   if (e.target.value !== '') return;
          //   emailInput.current.classList.remove('active');
          // }}
          // ref={emailInput}
          />
          {emailValidWarn ? (
            <div className='text-red-500 text-sm mt-2 animate-bounce'>Email address already exist!</div>
          ) : (
            <div> </div>
          )}
        </div>
        <div className='mb-3'>
          <label className='font-normal text-gray-600' for='profilePic'>
            Password
          </label>
          <input
            required
            minLength={6}
            placeholder='Require 6+ characters'
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
            placeholder='Require 6+ characters'
            className='border border-grey-400 block py-2 px-4 w-full rounded '
            type='password'
            name='confirmPassword'
            value={confirmPass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
              if(password !== e.target.value){
                setFormValid(false)
              }else{
                setFormValid(true)
              }
            }}
          />
          { (password !== confirmPass) ? (
            <div className='text-red-500 text-sm mt-2 animate-bounce'>Passsword does not match</div>
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
