import React from 'react';
import DevForm from './DevForm';
import { AiOutlineClose } from 'react-icons/ai';
import { useMultistepForm } from './UseMultistepForm';
import SignupForm from './SignupForm';

const FormModal = ({ open, setOpenModal }) => {
  const {
    steps,
    currentStepIndex,
    setCurrentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    next,
  } = useMultistepForm([<SignupForm />, <DevForm />]);

  const onSubmit = (e) => {
    e.preventDefault();
    next();
  };

  if (!open) return null;

  return (
    <div
      onClick={() => {
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
                // onClick={handleSubmit}
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
