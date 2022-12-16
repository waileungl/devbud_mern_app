import React from 'react';
// import axios from 'axios';
import DevCard from './DevCard';

const DevList = ({ devs }) => {
  return (
    <div>
      <div className='w-full py-12 px-4'>
        <div
          className='max-w-[1240px] mx-auto flex flex-col'
          id='cards-container'
        >
          {devs.map((oneDev, idx) => (
            <DevCard oneDev={oneDev} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevList;
