import React, { useState } from 'react';

const DevForm = ({
  firstName,
  lastName,
  profilePic,
  education,
  bio,
  yearsOfExp,
  javaScript,
  python,
  java,
  updateFields,
  setImgFile,
  imgFirebaseName
}) => {



  return (
    <div>
      <h2 className='text-2xl md:text-3xl font-bold text-center py-4'>
        Tell Us About Yourself!
      </h2>

      <div className='flex space-x-4 mb-3'>
        <div className='w-1/2'>
          <label className='text-sm sm:text-base font-normal text-gray-600' for='firstName'>
            First Name
          </label>
          <input
            required
            className='border border-grey-400 block py-1 sm:py-2 px-4 w-full rounded'
            type='text'
            name='firstName'
            value={firstName}
            onChange={(e) => updateFields({ firstName: e.target.value })}
          />
        </div>
        <div className='w-1/2'>
          <label className='text-sm sm:text-base font-normal text-gray-600' for='lastName'>
            Last Name
          </label>
          <input
            required
            className='border border-grey-400 block py-1 sm:py-2 px-4 w-full rounded'
            type='text'
            name='lastName'
            value={lastName}
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
            className='border border-grey-400 block py-1 sm:py-2 px-4 w-full rounded'
            type='text'
            name='education'
            value={education}
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
            className='border border-grey-400 block py-1 sm:py-2 px-4 w-full rounded'
            type='number'
            min='0'
            name='yearsOfExp'
            value={yearsOfExp}
            onChange={(e) => updateFields({ yearsOfExp: e.target.value })}
          />
        </div>
      </div>

      <div className='mb-3'>
        <label className='text-sm sm:text-base font-normal text-gray-600'>
          Profile Picture
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
            updateFields({profilePic: imgFirebaseName})
            setImgFile(e.target.files[0])
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
              checked={javaScript}
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
              checked={python}
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
              checked={java}
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
          className='border border-grey-400 block py-1 sm:py-2 px-4 w-full h-[100px] md:h-[200px] rounded'
          name='bio'
          rows='6'
          value={bio}
          onChange={(e) => updateFields({ bio: e.target.value })}
        />
      </div>
      {/* </form> */}
    </div>
  );
};

export default DevForm;
