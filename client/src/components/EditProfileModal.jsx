import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import { storage } from '../firebase';
import { ref, deleteObject, uploadBytes } from "firebase/storage"
import uuid from 'react-uuid';

const USER_DATA = {
  firstName: "",
  lastName: "",
  profilePic: "",
  education: "",
  yearsOfExp: "",
  bio: "",
  javaScript: false,
  python: false,
  java: false,
};

const EditProfileModal = ({ openEditProfileModal, setOpenEditProfileModal, setOpenSuccessModal, setLoginToken, setWelcomeWords, uploadingNotify, completeNotify, setLoaded, loaded }) => {
  const [userData, setUserData] = useState(USER_DATA)
  const [imgFile, setImgFile] = useState("")
  const [imgFirebaseName, setImgFirebaseName] = useState(uuid())
  const [imgOriginalName, setImgOriginalName] = useState("")
  const userId = localStorage.getItem('userId');


  //   This fucntion will help us update the variables form the inputs, like setState
  const updateFields = (fields) => {
    setUserData((prev) => {
      return { ...prev, ...fields };
    });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/devs/${userId}`)
      .then((res) => {
        setImgOriginalName(res.data.dev.profilePic)
        updateFields({
          firstName: res.data.dev.firstName,
          lastName: res.data.dev.lastName,
          profilePic: res.data.dev.profilePic,
          education: res.data.dev.education,
          yearsOfExp: res.data.dev.yearsOfExp,
          bio: res.data.dev.bio,
          javaScript: res.data.dev.javaScript,
          python: res.data.dev.python,
          java: res.data.dev.java,
        });
      })
      .catch((err) => console.error(err));
  }, [openEditProfileModal]);

  const onSubmit = (e) => {
    e.preventDefault();
    // If there is new img from user, delete the old one from firebase -> save the new one in firebase and its route into our database
    if (imgFile) {
      // Delete the file in firebase
      const desertRef = ref(storage, `user-profile-pic/${imgOriginalName}`);
      deleteObject(desertRef).then(() => {
        console.log("The old profile pic is deleted!")
      }).catch((err) => {
        console.log(err)
      });

      const imageRef = ref(storage, `user-profile-pic/${imgFirebaseName}`);
      uploadingNotify();
      //Upload img to firebase
      uploadBytes(imageRef, imgFile).then(() => {
        console.log("Image uploaded to firebase!")
        completeNotify();
        setLoaded(!loaded)
      })
    }

    console.log("user data to update>>>>", userData)

    axios
      .put(`http://localhost:8000/api/devs/${userId}`, userData)
      .then(() => {
        setWelcomeWords("Saved!")
        setOpenEditProfileModal(!openEditProfileModal)
        setOpenSuccessModal(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selfDestroy = () => {
    if (imgOriginalName) {
      // Delete the file in firebase
      const desertRef = ref(storage, `user-profile-pic/${imgOriginalName}`);
      deleteObject(desertRef).then(() => {
        console.log("The old profile pic is deleted!")
      }).catch((err) => {
        console.log(err)
      });
    }
    axios
      .delete(`http://localhost:8000/api/devs/${userId}`)
      .then(() => {
        localStorage.removeItem('jwt');
        setLoginToken("");
        setWelcomeWords("Account has been deleted");
        setOpenEditProfileModal(!openEditProfileModal)
        setOpenSuccessModal(true)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (!openEditProfileModal) return null;


  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 shadow-xl'
    >
      <div
        className=' w-full md:w-3/4 xl:w-1/3 lg:w-2/3 shadow-xl flex flex-col p-1 sm:p-4 my-4 rounded-lg bg-white'
      >
        <form onSubmit={onSubmit}>
          {/* This is the page number and close button  */}
          <div className='flex justify-between'>
            <div className='font-medium text-gray-400'>
            </div>
            <div className='font-medium text-2xl cursor-pointer'>
              <AiOutlineClose
                onClick={() => {
                  setOpenEditProfileModal(false);
                }}
              />
            </div>
          </div>
          <div>
            {/* <form> */}
            <h2 className='text-2xl md:text-3xl font-bold text-center py-4'>
              Your Tutor Profile
            </h2>

            {/* Form inputs */}
            <div className='flex space-x-4 mb-3'>
              <div className='w-1/2'>
                <label className='text-sm sm:text-base font-normal text-gray-600' for='firstName'>
                  First Name
                </label>
                <input
                  required
                  className='border border-grey-400 block py-2 px-4 w-full rounded'
                  type='text'
                  name='firstName'
                  value={userData.firstName}
                  onChange={(e) => updateFields({ firstName: e.target.value })}
                />
              </div>
              <div className='w-1/2'>
                <label className='text-sm sm:text-base font-normal text-gray-600' for='lastName'>
                  Last Name
                </label>
                <input
                  required
                  className='border border-grey-400 block py-2 px-4 w-full rounded'
                  type='text'
                  name='lastName'
                  value={userData.lastName}
                  onChange={(e) => updateFields({ lastName: e.target.value })}
                />
              </div>
            </div>

            <div className='flex space-x-4 mb-3'>
              <div className='w-1/2'>
                <label className='text-sm sm:text-base font-normal text-gray-600' for='education'>
                  Education
                </label>
                <input
                  className='border border-grey-400 block py-2 px-4 w-full rounded'
                  type='text'
                  name='education'
                  value={userData.education}
                  onChange={(e) => updateFields({ education: e.target.value })}
                />
              </div>
              <div className='w-1/2'>
                <label
                  for='yearsOfExp'
                  className='text-[0.7rem] sm:text-base font-normal text-gray-600'
                >
                  Years of Experience
                </label>
                <input
                  required
                  className='border border-grey-400 block py-2 px-4 w-full rounded'
                  type='number'
                  min='0'
                  name='yearsOfExp'
                  value={userData.yearsOfExp}
                  onChange={(e) => updateFields({ yearsOfExp: e.target.value })}
                />
              </div>
            </div>

            <div className='mb-3'>
              <label className='text-sm sm:text-base font-normal text-gray-600' for='profilePic'>
                Update Profile Picture
              </label>
              <input
                className='block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100'
                type='file'
                onChange={(e) => {
                  setImgFile(e.target.files[0])
                  updateFields({ profilePic: imgFirebaseName })
                }}
              />
            </div>

            <div className='mb-3'>
              <p className='text-sm sm:text-base mb-1 font-normal text-gray-600'>
                Select your prefered languages:
              </p>
              <div className='flex justify-start gap-4'>
                <div>
                  <input
                    type='checkbox'
                    name='javaScript'
                    className='w-2 h-2 md:w-3 md:h-3'
                    checked={userData.javaScript}
                    onChange={(e) => updateFields({ javaScript: e.target.checked })}
                  />
                  <label for='javeScript' className='ml-0.5 text-sm md:ml-1'>
                    JavaScript
                  </label>
                </div>
                <div>
                  <input
                    type='checkbox'
                    name='python'
                    className='w-2 h-2 md:w-3 md:h-3'
                    checked={userData.python}
                    onChange={(e) => updateFields({ python: e.target.checked })}
                  />
                  <label for='python' className='ml-0.5 text-sm md:ml-1'>
                    Python
                  </label>
                </div>
                <div>
                  <input
                    type='checkbox'
                    name='java'
                    className='w-2 h-2 md:w-3 md:h-3'
                    checked={userData.java}
                    onChange={(e) => updateFields({ java: e.target.checked })}
                  />
                  <label for='java' className='ml-0.5 text-sm md:ml-1'>
                    Java
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className='text-sm sm:text-base font-normal text-gray-600' for='bio'>
                Short Bio
              </label>
              <textarea
                required
                className='border border-grey-400 block py-2 px-4 w-full rounded h-[100px] md:h-[200px]'
                name='bio'
                rows='6'
                value={userData.bio}
                onChange={(e) => updateFields({ bio: e.target.value })}
              />
            </div>
            {/* </form> */}
          </div>



          {/* These are the buttons */}
          <div className='flex p-4 align-middle justify-center gap-2 md:gap-10'>
            <input
              type='button'
              onClick={() => selfDestroy()}
              className='rounded-md px-4 md:px-8 py-1 md:py-2 text-black bg-white border border-black transparent hover:bg-red-600 hover:text-white hover:border-red-600 cursor-pointer'
              value="Delete Account"
            />
            <button className='rounded-md px-4 md:px-8 py-2 text-white border bg-black hover:bg-transparent hover:text-black hover:border-black' type='submit'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
