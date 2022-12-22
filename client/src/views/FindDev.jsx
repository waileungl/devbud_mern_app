import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DevList from '../components/DevList';
import { NavBar3 } from '../components/NavBar3';
import FormModal from '../components/FormModal';

const FindDev = () => {
  const [devs, setDevs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
      <NavBar3
        openModal={openModal}
        setOpenModal={setOpenModal}
        loaded={loaded}
        setLoaded={setLoaded}
      />
      <DevList devs={devs} />
      <FormModal open={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default FindDev;
