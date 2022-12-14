import { useRef } from 'react';
import './mainStyles/landingPage.css'
import { Link } from 'react-router-dom'

import imageOne from './mainStyles/landing_page_carousel/image1.png'
import imageTwo from './mainStyles/landing_page_carousel/image2.png'
import imageThree from './mainStyles/landing_page_carousel/image3.png'
import backHomeArrow from './mainStyles/landing_page_carousel/back-arrow.png'

const LandingPage = props => {
    const { createRoom, userName, setUserName, joinRoom, invitationLink, setinvitationLink, roomName, setRoomName } = props
    const joinRoomMode = useRef(null)
    const inputCreateName = useRef(null)
    const inputCreateRoomName = useRef(null)
    const inputJoinName = useRef(null)
    const inputInvitation = useRef(null)

    function moveSlider(e) {
        const bullets = document.querySelectorAll(".bullets span");
        const images = document.querySelectorAll(".image");

        let index = e.target.dataset.value;

        let currentImage = document.querySelector(`.img-${index}`);
        images.forEach((img) => img.classList.remove("show"));
        currentImage.classList.add("show");

        const textSlider = document.querySelector(".text-group");
        textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;
        bullets.forEach((bull) => bull.classList.remove("active"));
        e.target.classList.add("active");
    }

    const switchMode = () => {
        joinRoomMode.current.classList.toggle("sign-up-mode")
    }

    return (
        <main ref={joinRoomMode}>
            <div className="box">
                <div className="inner-box">
                    <div className="forms-wrap">
                        <form action="index.html" autoComplete="off" className="sign-in-form landing-form" onSubmit={createRoom}>
                            <div className="logo">
                                <Link to='/'>
                                    <img className="back-home-header-button" src={backHomeArrow} />
                                </Link>
                                <h4>Devbud.</h4>
                            </div>

                            <div className="heading">
                                <h2>Create a Dev room</h2>
                                <h6>Have an invitation link?</h6>
                                <div className="toggle" onClick={switchMode}>Join room</div>
                            </div>

                            <div className="actual-form">
                                <div className="input-wrap" >
                                    <input
                                        type="text"
                                        minLength="1"
                                        maxLength="20"
                                        className="input-field"
                                        autoComplete="off"
                                        required
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        onFocus={() => inputCreateName.current.classList.add('active')}
                                        onBlur={(e) => {
                                            if (e.target.value !== "") return;
                                            inputCreateName.current.classList.remove('active')
                                        }}
                                        ref={inputCreateName}
                                    />
                                    <label className="placeHolder">Your name</label>
                                </div>
                                <div className="input-wrap" >
                                    <input
                                        type="text"
                                        minLength="1"
                                        maxLength="20"
                                        className="input-field"
                                        autoComplete="off"
                                        required
                                        value={roomName}
                                        onChange={(e) => setRoomName(e.target.value)}
                                        onFocus={() => inputCreateRoomName.current.classList.add('active')}
                                        onBlur={(e) => {
                                            if (e.target.value !== "") return;
                                            inputCreateRoomName.current.classList.remove('active')
                                        }}
                                        ref={inputCreateRoomName}
                                    />
                                    <label className="placeHolder">Room name</label>
                                </div>

                                <input type="submit" value="Create Room" className="sign-btn" />

                            </div>
                        </form>

                        <form action="index.html" autoComplete="off" className="sign-up-form landing-form" onSubmit={joinRoom}>
                            <div className="logo">
                                <h4>Devbud.</h4>
                            </div>

                            <div className="heading">
                                <h2>Join a room</h2>
                                <h6>No invitation link?</h6>
                                <div className="toggle" onClick={switchMode}>Create Room</div>
                            </div>

                            <div className="actual-form">
                                <div className="input-wrap" >
                                    <input
                                        type="text"
                                        minLength="1"
                                        maxLength="20"
                                        className="input-field"
                                        autoComplete="off"
                                        required
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        onFocus={() => inputJoinName.current.classList.add('active')}
                                        onBlur={(e) => {
                                            if (e.target.value !== "") return;
                                            inputJoinName.current.classList.remove('active')
                                        }}
                                        ref={inputJoinName}
                                    />
                                    <label className="placeHolder">Your name</label>
                                </div>

                                <div className="input-wrap" >
                                    <input
                                        type="text"
                                        className="input-field"
                                        autoComplete="off"
                                        required
                                        value={invitationLink}
                                        onChange={(e) => setinvitationLink(e.target.value)}
                                        onFocus={() => inputInvitation.current.classList.add('active')}
                                        onBlur={(e) => {
                                            if (e.target.value !== "") return;
                                            inputInvitation.current.classList.remove('active')
                                        }}
                                        ref={inputInvitation}
                                    />
                                    <label className="placeHolder">Invitation link</label>
                                </div>

                                <input type="submit" value="Join" className="sign-btn" />

                            </div>
                        </form>
                    </div>

                    <div className="carousel">
                        <div className="images-wrapper">
                            <img src={imageOne} className="image img-1 show" alt="" />
                            <img src={imageTwo} className="image img-2" alt="" />
                            <img src={imageThree} className="image img-3" alt="" />
                        </div>

                        <div className="text-slider">
                            <div className="text-wrap">
                                <div className="text-group">
                                    <h2>Create your own room</h2>
                                    <h2>Practice coding skill</h2>
                                    <h2>Invite friends to join</h2>
                                </div>
                            </div>

                            <div className="bullets">
                                <span onClick={(e) => moveSlider(e)} className="active" data-value="1"></span>
                                <span onClick={(e) => moveSlider(e)} data-value="2"></span>
                                <span onClick={(e) => moveSlider(e)} data-value="3"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )


}


export default LandingPage;