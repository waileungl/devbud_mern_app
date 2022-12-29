import React, { useState } from 'react';
import axios from 'axios';
import DevForm from './DevForm';
import SignupForm from './SignupForm';
import { AiOutlineClose } from 'react-icons/ai';
import { useMultistepForm } from './UseMultistepForm';
import { storage } from '../firebase';
import { ref, uploadBytes } from "firebase/storage"
import uuid from 'react-uuid';

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

const FormModal = ({
  open,
  setOpenModal,
  loaded,
  setLoaded,
  setLoginToken,
  setOpenSuccessModal,
  setWelcomeWords,
  uploadingNotify,
  completeNotify
}) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [confirmPass, setConfirmPass] = useState('');
  const [formValid, setFormValid] = useState(true)
  const [imgFile, setImgFile] = useState("")
  const [imgFirebaseName, setImgFirebaseName] = useState(uuid())

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
    stay,
  } = useMultistepForm([
    <SignupForm
      {...data}
      updateFields={updateFields}
      confirmPass={confirmPass}
      setConfirmPass={setConfirmPass}
      setFormValid={setFormValid}
    />,
    <DevForm {...data} updateFields={updateFields} imgFile={imgFile} setImgFile={setImgFile} imgFirebaseName={imgFirebaseName}/>,
  ]);

  const uploadImage = () => {
    if(imgFile == null) return

    // Make ref to firebase
    const imageRef = ref(storage, `user-profile-pic/${imgFirebaseName}`);
    uploadingNotify();
    //Upload img to firebase
    uploadBytes(imageRef ,imgFile).then(() => {
      console.log("Image uploaded to firebase!")
      setLoaded(!loaded);
      completeNotify();
    })

  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formValid) return stay();
    if (!isLastStep) return next();

    uploadImage()

    console.log("data to submit>>>>>>>>>>", data)

    axios
      .post('http://localhost:8000/api/devs', data)
      .then((res) => {
        console.log('post response here>>>>>>>>>>>', res.data);
        if(res.data.error){
          setOpenModal(false);
          return alert("Something went wrong, fail to register!")
        }
        const loginData = {
          email: data.email,
          password: data.password,
        };
        axios
          .post('http://localhost:8000/api/login', loginData)
          .then((res) => {
            localStorage.setItem('jwt', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            setLoginToken(localStorage.getItem('jwt'));
            setConfirmPass('');
            setCurrentStepIndex(0);
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
            setOpenModal(false);
            setWelcomeWords('Welcome to Devbud!');
            setOpenSuccessModal(true);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!open) return null;

  return (
    <div
      // onClick={() => setOpenModal(false)}
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 shadow-xl'
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className=' w-full md:w-3/4 lg:w-1/3 shadow-xl flex flex-col p-1 sm:p-4 my-4 rounded-lg bg-white'
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
              <button className='rounded-md px-8 py-2 text-white border bg-black hover:bg-transparent hover:text-black hover:border-black'>
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
