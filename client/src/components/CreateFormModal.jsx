import React, { useState } from 'react';
import axios from 'axios';

const CreateFormModal = ({ handleClose, open, loaded, setLoaded }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [education, setEducation] = useState('');
  const [yearsOfExp, setYearsOfExp] = useState(0);
  const [profilePic, setProfilePic] = useState('');
  const [bio, setBio] = useState('');
  const [javaScript, setJavaScript] = useState(false);
  const [python, setPython] = useState(false);
  const [java, setJava] = useState(false);
  const [cSharp, setCSharp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDev = {
      firstName,
      lastName,
      education,
      yearsOfExp,
      profilePic,
      bio,
      javaScript,
      python,
      java,
      cSharp,
    };

    axios
      .post('http://localhost:8000/api/devs', newDev)
      .then((res) => {
        console.log(res.data);
        setLoaded(!loaded);
        // createDev(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    handleClose();
  };

  if (!open) return null;

  return (
    <div
      onClick={handleClose}
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 shadow-xl'
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className=' w-full md:w-3/4 lg:w-1/3 shadow-xl flex flex-col p-4 my-4 rounded-lg bg-white'
      >
        <form>
          <h2 className='text-3xl font-bold text-center py-4 mt-4'>
            Tell Us About Yourself!
          </h2>
          <hr className='mb-4' />

          {/* Form inputs */}
          <div className='flex space-x-4 mb-3'>
            <div className='w-1/2'>
              <label for='firstName'>First Name</label>
              <input
                className='border border-grey-400 block py-2 px-4 w-full rounded'
                type='text'
                name='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='w-1/2'>
              <label for='lastName'>Last Name</label>
              <input
                className='border border-grey-400 block py-2 px-4 w-full rounded'
                type='text'
                name='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className='flex space-x-4 mb-3'>
            <div className='w-1/2'>
              <label for='education'>Education</label>
              <input
                className='border border-grey-400 block py-2 px-4 w-full rounded'
                type='text'
                name='education'
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
            </div>
            <div className='w-1/2'>
              <label for='yearsOfExp' className='text-sm md:text-base'>
                Years of Experience
              </label>
              <input
                className='border border-grey-400 block py-2 px-4 w-full rounded'
                type='number'
                min='0'
                name='yearsOfExp'
                value={yearsOfExp}
                onChange={(e) => setYearsOfExp(e.target.value)}
              />
            </div>
          </div>

          <div className='mb-3'>
            <label className='font-medium' for='profilePic'>
              Profile Picture Link
            </label>
            <input
              className='border border-grey-400 block py-2 px-4 w-full rounded'
              type='text'
              name='profilePic'
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <p className='mb-1 font-medium'>Select your prefered languages:</p>
            <div className='flex justify-start gap-4'>
              <div>
                <input
                  type='checkbox'
                  name='javaScript'
                  checked={javaScript}
                  onChange={(e) => setJavaScript(e.target.checked)}
                />
                <label for='javeScript' className='ml-1'>
                  JavaScript
                </label>
              </div>
              <div>
                <input
                  type='checkbox'
                  name='python'
                  checked={python}
                  onChange={(e) => setPython(e.target.checked)}
                />
                <label for='python' className='ml-1'>
                  Python
                </label>
              </div>
              <div>
                <input
                  type='checkbox'
                  name='java'
                  checked={java}
                  onChange={(e) => setJava(e.target.checked)}
                />
                <label for='java' className='ml-1'>
                  Java
                </label>
              </div>
              <div>
                <input
                  type='checkbox'
                  name='cSharp'
                  checked={cSharp}
                  onChange={(e) => setCSharp(e.target.checked)}
                />
                <label for='cSharp' className='ml-1'>
                  C#
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className='font-medium' for='bio'>
              Short Bio
            </label>
            <textarea
              className='border border-grey-400 block py-2 px-4 w-full rounded'
              name='bio'
              rows='6'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <hr className='mt-6' />

          <div className='flex p-4 align-middle justify-center gap-10'>
            <button
              onClick={handleSubmit}
              className='rounded-md px-8 py-2 text-white border bg-black hover:bg-transparent hover:text-black hover:border-black'
            >
              Submit
            </button>
            <button
              onClick={handleClose}
              className='rounded-md px-8 py-2 text-white border bg-black hover:bg-transparent hover:text-black hover:border-black'
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFormModal;
