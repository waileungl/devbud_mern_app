import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DevList from '../components/DevList';
import { NavBar3 } from '../components/NavBar3';
import FormModal from '../components/FormModal';
import LoginModal from '../components/LoginModal';
import EditProfileModal from '../components/EditProfileModal';
import SuccessModal from '../components/SuccessModal';

const FindDev = () => {
  const [devs, setDevs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [loginToken, setLoginToken] = useState("");
  const [welcomeWords, setWelcomeWords] = useState("");

  useEffect(() => {
    setLoginToken(localStorage.getItem('jwt'));

    axios
      .get('http://localhost:8000/api/devs')
      .then((res) => {
        setDevs(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, [loaded, openEditProfileModal]);

  return (
    <div>
      <NavBar3
        openModal={openModal}
        setOpenModal={setOpenModal}
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
        loaded={loaded}
        setLoaded={setLoaded}
        loginToken={loginToken}
        setLoginToken={setLoginToken}
        openEditProfileModal={openEditProfileModal}
        setOpenEditProfileModal={setOpenEditProfileModal}
      />
      <DevList devs={devs} loaded={loaded}/>
      <FormModal
        open={openModal}
        setOpenModal={setOpenModal}
        loaded={loaded}
        setLoaded={setLoaded}
        setLoginToken={setLoginToken}
        setOpenSuccessModal={setOpenSuccessModal}
        setWelcomeWords={setWelcomeWords}
      />
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
        loaded={loaded}
        setLoaded={setLoaded}
        setLoginToken={setLoginToken}
        setOpenSuccessModal={setOpenSuccessModal}
        setWelcomeWords={setWelcomeWords}
      />
      <EditProfileModal
        openEditProfileModal={openEditProfileModal}
        setOpenEditProfileModal={setOpenEditProfileModal}
        loginToken={loginToken}
        setLoginToken={setLoginToken}
        setOpenSuccessModal={setOpenSuccessModal}
        setWelcomeWords={setWelcomeWords}
      />
      {openSuccessModal &&
      <SuccessModal
        openSuccessModal={openSuccessModal}
        setOpenSuccessModal={setOpenSuccessModal}
        welcomeWords={welcomeWords}
      />}
    </div>
  );
};

export default FindDev;
