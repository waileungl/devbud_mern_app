import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DevList from '../components/DevList';
import { NavBar3 } from '../components/NavBar3';

const FindDev = () => {
  const [devs, setDevs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/devs')
      .then((res) => {
        setDevs(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, [loaded]);

  return (
    <div>
      <NavBar3 loaded={loaded} setLoaded={setLoaded} />
      <DevList devs={devs} />
    </div>
  );
};

export default FindDev;
