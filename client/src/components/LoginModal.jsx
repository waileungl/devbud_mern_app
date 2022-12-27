import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';


const LoginModal = ({ openLoginModal, setOpenLoginModal, loaded, setLoaded, setLoginToken, setOpenSuccessModal, setWelcomeWords }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidWarning, setInvalidWarning] = useState("")


  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    }

    axios
      .post('http://localhost:8000/api/login', data)
      .then((res) => {
        console.log("response here>>>>>>>>>>>", res);
        if(res.data.error){
          setInvalidWarning(res.data.error)
          return
        }
        localStorage.setItem('jwt', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        setLoginToken(localStorage.getItem('jwt'));
        setWelcomeWords(`Welcome Back! ${res.data.userName}`)
        setLoaded(!loaded);
        setInvalidWarning("")
        // createDev(res.data);
        setOpenLoginModal(false);
        setOpenSuccessModal(true)
      })
      .catch((err) => {
        console.log(err);
      });

  };

  if (!openLoginModal) return null;

  return (
    <div
      onClick={() => {
        setEmail('')
        setPassword('');
        setOpenLoginModal(false);
      }}
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 shadow-xl'
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className=' w-full md:w-3/4 lg:w-1/3 shadow-xl flex flex-col p-4 my-4 rounded-lg bg-white'
      >
        <form onSubmit={onSubmit}>
          {/* This is the page number and close button  */}
          <div className='flex justify-between'>
            <div className='font-medium text-gray-400'>
            </div>
            <div className='font-medium text-2xl cursor-pointer'>
              <AiOutlineClose
                onClick={() => {
                  setEmail('')
                  setPassword('');
                  setOpenLoginModal(false);
                }}
              />
            </div>
          </div>
          <div className='text-center py-4'>
            <h2 className='text-2xl md:text-3xl font-bold'>Welcome Back!</h2>
            <p className='text-sm md:text-lg text-gray-600'>
              Please login to edit your profile
            </p>
          </div>

          <div>
            <div className='mb-3'>
              <label className='font-normal text-gray-600' htmlFor='profilePic'>
                Email
              </label>
              <input
                required
                minLength={5}
                className='border border-grey-400 block py-2 px-4 w-full rounded '
                type='text'
                name='email'
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </div>
            <div className='mb-3'>
              <label className='font-normal text-gray-600' htmlFor='profilePic'>
                Password
              </label>
              <input
                required
                minLength={6}
                className='border border-grey-400 block py-2 px-4 w-full rounded'
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {invalidWarning ? (
            <div className='text-red-500 text-sm mt-2'>{ invalidWarning} </div>
          ) : (
            <div> </div>
          )}
          <div className='flex p-4 align-middle justify-center gap-10'>
            <button className='rounded-md px-8 py-2 text-white border bg-black hover:bg-transparent hover:text-black hover:border-black'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
