import React, { useEffect, useRef, useState } from "react";
import '../mainStyles/mainRoom.css'


const VideoPlayer = ({ user, users, rtmClient, setLoadingState }) => {
    const [userNameOnDiv, setUserNameOnDiv] = useState('')
    const ref = useRef();

    useEffect(() => {
        const getDisplayName = async (id) => {
            const displayNameByID = await rtmClient.getUserAttributesByKeys(id, ['name'])
            setUserNameOnDiv(displayNameByID.name)
        }

        getDisplayName(user.uid);
        user.videoTrack.play(ref.current)
        setLoadingState(false)
    }, [])

    const zoomInHandler = () => {
        const zoomInElement = document.getElementById(`${user.uid}`);
        const zoomInClassName = zoomInElement.className;
        if (zoomInClassName.includes('video-full-container')) {
            document.getElementById(`${user.uid}`).classList.add('video-participant')
            document.getElementById(`${user.uid}`).classList.remove('video-full-container')
            const allOtherDiv = document.querySelectorAll(".hideSelf")
            for (let i = 0; i < allOtherDiv.length; i++) {
                allOtherDiv[i].classList.remove('hideSelf')
            }
        } else {
            document.getElementById(`${user.uid}`).classList.add('video-full-container')
            document.getElementById(`${user.uid}`).classList.remove('video-participant')
            const allOtherDiv = document.querySelectorAll(".video-participant")
            for (let i = 0; i < allOtherDiv.length; i++) {
                allOtherDiv[i].classList.add('hideSelf')
            }
        }
    }


    return (
        <>
            <div className={users.length > 1 ? "video-participant" : "video-full-container"} id={user.uid}>
                <div className="participant-action">
                    {/* <div className={trackState.audio ? "btn-on" : "btn-mute"}></div> */}
                    <button className="btn-camera" onClick={zoomInHandler}></button>
                </div>
                <div className="name-tag">{userNameOnDiv}</div>
                <div
                    ref={ref}
                    className="video-player"
                ></div>

            </div>
        </>
    )
}

export default VideoPlayer;