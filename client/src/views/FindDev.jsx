import React, { useState } from 'react';
import DevList from '../components/DevList';
import { NavBar3 } from '../components/NavBar3';

const FindDev = () => {
  return (
    <div>
      <NavBar3 />
      <DevList />
    </div>
  );
};

export default FindDev;
