import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DevList from '../components/DevList';
import { NavBar3 } from '../components/NavBar3';
import FormModal from '../components/FormModal';
import LoginModal from '../components/LoginModal';
import EditProfileModal from '../components/EditProfileModal';
import SuccessModal from '../components/SuccessModal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FindDev = () => {
  const [devs, setDevs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loadImg, setLoadImg] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [loginToken, setLoginToken] = useState("");
  const [welcomeWords, setWelcomeWords] = useState("");


  const showAllDevs = () => {
    axios
      .get('http://localhost:8000/api/devs')
      .then((res) => {
        setDevs(res.data);
        setLoaded(!loaded);
        console.log("all devs here", res.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    setLoginToken(localStorage.getItem('jwt'));

    axios
    .get('http://localhost:8000/api/devs')
    .then((res) => {
      setDevs(res.data);
      console.log("all devs here", res.data);
    })
    .catch((err) => console.error(err));

  }, [loaded, openLoginModal, openEditProfileModal]);

  const uploadingNotify = () => {
    toast('Uploading picture...', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const completeNotify = () => {
    toast.success('Uploaded!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }


  const findDevsByLanguage = (language) => {
    axios
      .get(`http://localhost:8000/api/devs/filter/${language}`)
      .then((res) => {
        setDevs(res.data);
        setLoadImg(!loadImg)
        console.log(`all devs know ${language} here`, res.data);
      })
      .catch((err) => console.error(err));
  }


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
      <DevList devs={devs} loaded={loaded} findDevsByLanguage={findDevsByLanguage} showAllDevs={showAllDevs} loadImg={loadImg}/>
      <FormModal
        open={openModal}
        setOpenModal={setOpenModal}
        loaded={loaded}
        setLoaded={setLoaded}
        setLoginToken={setLoginToken}
        setOpenSuccessModal={setOpenSuccessModal}
        setWelcomeWords={setWelcomeWords}
        uploadingNotify={uploadingNotify}
        completeNotify={completeNotify}
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
        uploadingNotify={uploadingNotify}
        completeNotify={completeNotify}
        setLoaded={setLoaded}
        loaded={loaded}
      />
      {openSuccessModal &&
        <SuccessModal
          openSuccessModal={openSuccessModal}
          setOpenSuccessModal={setOpenSuccessModal}
          welcomeWords={welcomeWords}
        />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default FindDev;
