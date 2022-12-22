import React from 'react';

const DevForm = () => {
  return (
    <div>
      {/* <form> */}
      <h2 className='text-2xl md:text-3xl font-bold text-center py-4'>
        Tell Us About Yourself!
      </h2>
      <hr className='mb-4' />

      {/* Form inputs */}
      <div className='flex space-x-4 mb-3'>
        <div className='w-1/2'>
          <label className='font-normal text-gray-600' for='firstName'>
            First Name
          </label>
          <input
            required
            className='border border-grey-400 block py-2 px-4 w-full rounded'
            type='text'
            name='firstName'
            //   value={firstName}
            //   onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='w-1/2'>
          <label className='font-normal text-gray-600' for='lastName'>
            Last Name
          </label>
          <input
            required
            className='border border-grey-400 block py-2 px-4 w-full rounded'
            type='text'
            name='lastName'
            //   value={lastName}
            //   onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className='flex space-x-4 mb-3'>
        <div className='w-1/2'>
          <label className='font-normal text-gray-600' for='education'>
            Education
          </label>
          <input
            className='border border-grey-400 block py-2 px-4 w-full rounded'
            type='text'
            name='education'
            //   value={education}
            //   onChange={(e) => setEducation(e.target.value)}
          />
        </div>
        <div className='w-1/2'>
          <label
            for='yearsOfExp'
            className='text-sm md:text-base font-normal text-gray-600'
          >
            Years of Experience
          </label>
          <input
            required
            className='border border-grey-400 block py-2 px-4 w-full rounded'
            type='number'
            min='0'
            name='yearsOfExp'
            //   value={yearsOfExp}
            //   onChange={(e) => setYearsOfExp(e.target.value)}
          />
        </div>
      </div>

      <div className='mb-3'>
        <label className='font-normal text-gray-600' for='profilePic'>
          Profile Picture Link
        </label>
        <input
          className='border border-grey-400 block py-2 px-4 w-full rounded'
          type='text'
          name='profilePic'
          // value={profilePic}
          // onChange={(e) => setProfilePic(e.target.value)}
        />
      </div>

      <div className='mb-3'>
        <p className='mb-1 font-normal text-gray-600'>
          Select your prefered languages:
        </p>
        <div className='flex justify-start gap-4'>
          <div>
            <input
              type='checkbox'
              name='javaScript'
              // checked={javaScript}
              // onChange={(e) => setJavaScript(e.target.checked)}
            />
            <label for='javeScript' className='ml-1'>
              JavaScript
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              name='python'
              // checked={python}
              // onChange={(e) => setPython(e.target.checked)}
            />
            <label for='python' className='ml-1'>
              Python
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              name='java'
              // checked={java}
              // onChange={(e) => setJava(e.target.checked)}
            />
            <label for='java' className='ml-1'>
              Java
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              name='cSharp'
              // checked={cSharp}
              // onChange={(e) => setCSharp(e.target.checked)}
            />
            <label for='cSharp' className='ml-1'>
              C#
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className='font-normal text-gray-600' for='bio'>
          Short Bio
        </label>
        <textarea
          required
          className='border border-grey-400 block py-2 px-4 w-full rounded'
          name='bio'
          rows='6'
          // value={bio}
          // onChange={(e) => setBio(e.target.value)}
        />
      </div>
      {/* </form> */}
    </div>
  );
};

export default DevForm;
