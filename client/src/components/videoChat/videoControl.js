
import '../mainStyles/mainRoom.css'
import React, { useEffect } from 'react';

// react-icons
import { CgScreen } from 'react-icons/cg';
import { FiCameraOff } from 'react-icons/fi';
import { FiCamera } from 'react-icons/fi';
import { BiMicrophoneOff } from 'react-icons/bi';
import { BiMicrophone } from 'react-icons/bi';
import { RiFullscreenFill, RiLayoutRightLine } from 'react-icons/ri';
import { RiFullscreenExitLine } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useNavigate } from "react-router-dom";

export default function VideoControl(props) {
    const { rtcClient, tracks, setJoined, videoDiv, trackState, setTrackState, leaveRTMchannel, shareScreenHandler, closeShareScreenHandler, screenShareState } = props;
    const navigate = useNavigate();

    const shareScreenNotify = () => {
        toast.warn('Not available for your device', {
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


    useEffect(() => {
        const clickMic = document.querySelector(".microphone-btn");
        if (!trackState.audio) {
            clickMic.classList.remove('btn-selected')
        } else {
            clickMic.classList.add('btn-selected')
        }

        const clickCam = document.querySelector(".camera-btn");
        if (!trackState.video) {
            clickCam.classList.remove('btn-selected')
        } else {
            clickCam.classList.add('btn-selected')
        }
    }, [])

    const mute = async (mediaType) => {
        if (mediaType === "audio") {
            const clickMic = document.querySelector(".microphone-btn");
            if (!trackState.audio) {
                clickMic.classList.add('btn-selected')
            } else {
                clickMic.classList.remove('btn-selected')
            }
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState(ps => {
                return { ...ps, audio: !ps.audio };
            });
        }
        if (mediaType === "video") {
            const clickCam = document.querySelector(".camera-btn");
            if (!trackState.video) {
                clickCam.classList.add('btn-selected')
            } else {
                clickCam.classList.remove('btn-selected')
            }
            await tracks[1].setEnabled(!trackState.video);
            setTrackState(ps => {
                return { ...ps, video: !ps.video };
            });
        }
    };

    const fullScreenHandler = () => {
        if (document.fullscreenElement) {
            videoDiv.exit()
        }
        if (!document.fullscreenElement) {
            videoDiv.enter()
        }
    }

    const leaveChannel = async () => {
        navigate('/room')
        await rtcClient.leave();
        rtcClient.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setJoined(false);
        leaveRTMchannel();
    };

    const toggleScreenShare = async () => {
        try {
            if (screenShareState) {
                const shareScreenBtn = document.querySelector("#share-screen")
                shareScreenBtn.classList.remove("btn-selected");
                if (trackState.video === false) {
                    const clickCam = document.querySelector(".camera-btn");
                    clickCam.classList.add('btn-selected')
                    await tracks[1].setEnabled(!trackState.video);
                    setTrackState(ps => {
                        return { ...ps, video: !ps.video };
                    });
                }
                closeShareScreenHandler();
            }
            if (!screenShareState) {
                const shareScreenBtn = document.querySelector("#share-screen")
                shareScreenBtn.classList.add("btn-selected");
                if (trackState.video === false) {
                    const clickCam = document.querySelector(".camera-btn");
                    clickCam.classList.add('btn-selected')
                    await tracks[1].setEnabled(!trackState.video);
                    setTrackState(ps => {
                        return { ...ps, video: !ps.video };
                    });
                }

                shareScreenHandler()
            }
        }
        catch {
            shareScreenNotify();
        }

    }

    return (
        <>
            <div className="video-action-button camera-btn" onClick={() => mute("video")} title="Camera">
                {trackState.video && <FiCamera />}
                {!trackState.video && <FiCameraOff />}
            </div>

            <div className="video-action-button microphone-btn" onClick={() => mute("audio")} title="Microphone">
                {trackState.audio && <BiMicrophone />}
                {!trackState.audio && <BiMicrophoneOff />}
            </div>

            <div className="video-action-button full-screen-btn" onClick={() => fullScreenHandler()} title="Full screen">
                {document.fullscreenElement && <RiFullscreenExitLine />}
                {!document.fullscreenElement && <RiFullscreenFill />}
            </div>

            <div className="video-action-button" id='share-screen' onClick={() => toggleScreenShare()} title="Share screen">
                <CgScreen />
            </div>

            <button className="video-action-button endcall" onClick={() => leaveChannel()}>Leave</button>
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
        </>
    )
} 