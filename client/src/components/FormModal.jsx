import React, { useState } from 'react';
import axios from 'axios';
import DevForm from './DevForm';
import SignupForm from './SignupForm';
import { AiOutlineClose } from 'react-icons/ai';
import { useMultistepForm } from './UseMultistepForm';

const INITIAL_DATA = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  profilePic: '',
  education: '',
  yearsOfExp: '',
  bio: '',
  javaScript: false,
  python: false,
  java: false,
};

const FormModal = ({ open, setOpenModal, loaded, setLoaded }) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [confirmPass, setConfirmPass] = useState('');

  //   This fucntion will help us update the variables form the inputs, like setState
  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const {
    steps,
    currentStepIndex,
    setCurrentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    next,
  } = useMultistepForm([
    <SignupForm
      {...data}
      updateFields={updateFields}
      confirmPass={confirmPass}
      setConfirmPass={setConfirmPass}
    />,
    <DevForm {...data} updateFields={updateFields} />,
  ]);

  const onSubmit = (e) => {
    e.preventDefault();


    if (!isLastStep) return next();
<<<<<<< HEAD
    // Make axios call here
=======
>>>>>>> db332ec00904f119a8f416ecdf192da807c1be6c

    updateFields({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      profilePic: '',
      education: '',
      yearsOfExp: '',
      bio: '',
      javaScript: false,
      python: false,
      java: false,
      //   cSharp: false,
    });
<<<<<<< HEAD
    setConfirmPass('');
=======
    // Make axios call here
    axios
      .post('http://localhost:8000/api/devs', data)
      .then((res) => {
        console.log(res.data);
        setLoaded(!loaded);
        // createDev(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
>>>>>>> db332ec00904f119a8f416ecdf192da807c1be6c
    setCurrentStepIndex(0);
    setOpenModal(false);
  };

  if (!open) return null;

  return (
    <div
      onClick={() => {
        updateFields({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          profilePic: '',
          education: '',
          yearsOfExp: '',
          bio: '',
          javaScript: false,
          python: false,
          java: false,
          //   cSharp: false,
        });
        setConfirmPass('');
        setCurrentStepIndex(0);
        setOpenModal(false);
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
              Step {currentStepIndex + 1} of {steps.length}
            </div>
            <div className='font-medium text-2xl cursor-pointer'>
              <AiOutlineClose
                onClick={() => {
                  updateFields({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    profilePic: '',
                    education: '',
                    yearsOfExp: '',
                    bio: '',
                    javaScript: false,
                    python: false,
                    java: false,
                    // cSharp: false,
                  });
                  setConfirmPass('');
                  setCurrentStepIndex(0);
                  setOpenModal(false);
                }}
              />
            </div>
          </div>
          {step}

          {/* <hr className='mt-6' /> */}

          {/* These are the buttons */}
          <div className='flex p-4 align-middle justify-center gap-10'>
            {!isLastStep && (
              <button
                type='submit'
                // onClick={next}
                className='rounded-md px-8 py-2 text-black border border-black transparent hover:bg-black hover:text-white hover:border-black'
              >
                Next
              </button>
            )}

            {!isFirstStep && (
              <button
                type='submit'
                onClick={back}
                className='rounded-md px-8 py-2 text-black border border-black transparent hover:bg-black hover:text-white hover:border-black'
              >
                Back
              </button>
            )}
            {!isFirstStep && (
              <button
<<<<<<< HEAD
                // type='submit'
                // onClick={handleSubmit}
=======
>>>>>>> db332ec00904f119a8f416ecdf192da807c1be6c
                className='rounded-md px-8 py-2 text-white border bg-black hover:bg-transparent hover:text-black hover:border-black'
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
