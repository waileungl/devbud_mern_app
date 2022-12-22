// -- React Hook import
import { useParams } from "react-router";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// -- dependence import
import { FullScreen, useFullScreenHandle } from "react-full-screen";

// -- Component import
import MainHeader from "./roomHeader/mainHeader";
import Video from "./videoChat/video";
import Compiler from './codeEditor/compiler';
import Groupchat from './groupChat/groupChat';

// -- Agora(RTC, RTM) import
import AgoraRTC from 'agora-rtc-sdk-ng';
import { APP_ID, TOKEN, usertcClient } from './agora_configuration';
import { usertmClient } from './agora_configuration';

// -- CSS import
import videoChatIcon from './mainStyles/navigation_icons/videoChat.png'
import codeIcon from './mainStyles/navigation_icons/code.png'
import './mainStyles/mainRoom.css';


var codeChannel;
var outputChannel;
var chatChannel;
var rtmClient = usertmClient();
var rtcClient = usertcClient();
var nameByID;
var roomNameTitle;
var memberCount;

var rightSide;
var expandBtn;

const Room = ({ joined, setJoined, userID, userName, setRoomName, setinvitationLink, setUserName }) => {
    const { ROOMID } = useParams();
    const [code, setCode] = useState(" ")
    const [output, setOutput] = useState("")
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])
    const [codeRoom, setCodeRoom] = useState({})
    const [outputRoom, setOutputRoom] = useState({})
    const [count, setCount] = useState('')
    const [displayVideo, setDisplayVideo] = useState(true)
    const navigate = useNavigate();

    // RTC hook
    const [localTracks, setLocalTracks] = useState([]);
    const [users, setUsers] = useState([]);

    var videoRoomID = "video" + ROOMID
    var chatRoomID = "chat" + ROOMID
    var codeRoomID = "code" + ROOMID
    var outputRoomID = "ouput" + ROOMID

    var videoDiv = useFullScreenHandle();

    useEffect(() => {
        // validation
        if (userName === undefined || userName === "" || !ROOMID.includes("@")) {
            setJoined(false)
            navigate('/invalid')
        }

        // convert invitation link back to room name
        roomNameTitle = ROOMID.substring(9).replace(/-/g, ' ')

        // ------RTM configuration------
        const codeRoomConnect = async () => {
            codeChannel = await rtmClient.createChannel(codeRoomID);
            await codeChannel.join();
            codeChannel.on('ChannelMessage', codeFromOther => {
                setCode(codeFromOther);
            });
            // Have to store that into a hook otherwise it won't pass to the next level component
            setCodeRoom(codeChannel)
        }

        const outputRoomConnect = async () => {
            outputChannel = await rtmClient.createChannel(outputRoomID);
            await outputChannel.join();
            outputChannel.on('ChannelMessage', outputFromOther => {
                setOutput(outputFromOther.text)
            });
            // Have to store that into a hook otherwise it won't pass to the next level component
            setOutputRoom(outputChannel)
        }

        const chatRoomConnect = async () => {
            chatChannel = await rtmClient.createChannel(chatRoomID);
            await chatChannel.join();
            chatChannel.on('MemberJoined', handleMemberJoined)
            chatChannel.on('MemberLeft', handleMemberLeft)
            countMember();
            //append message for local user to see join room notification
            appendMessage({
                notice: `You just joined the room!`,
            });
            chatChannel.on('ChannelMessage', handleChannelMessage);
        }

        const handleMemberJoined = async (MemberID) => {
            nameByID = await rtmClient.getUserAttributesByKeys(MemberID, ['name'])
            chatChannel.sendMessage({ text, type: 'text' });
            countMember()
            appendMessage({
                notice: `${nameByID.name} just joined the room!`,
            });
        }

        const handleMemberLeft = async (MemberID) => {
            chatChannel.sendMessage({ text, type: 'text' });
            countMember()
            appendMessage({
                notice: `${nameByID.name} has left the room`,
            });
        }

        const handleChannelMessage = async (message, userID) => {
            //data = {'type': 'chat', 'message': text, 'displayName': userName}
            let data = JSON.parse(message.text)
            appendMessage({
                text: data.message,
                uid: userID,
                displayName: data.displayName
            });
        }

        const appendMessage = (message) => {
            setMessages((messages) => [...messages, message]);
        };

        const countMember = async () => {
            let member = await chatChannel.getMembers()
            memberCount = member.length
            setCount(memberCount)
        }

        const login = async () => {
            console.log("...................trying to login RTM now.........................");
            await rtmClient.login({
                uid: userID,
                token: null
            });
            //add attribute to rtmclient in order to display user name on chat app
            await rtmClient.addOrUpdateLocalUserAttributes({ 'name': userName })
            codeRoomConnect();
            chatRoomConnect();
            outputRoomConnect();
        }

        login();

        // -----RTC configuration-----

        const handleUserJoined = async (user, mediaType) => {
            // Subscribing is the act of receiving media streams published by remote users to the channel
            await rtcClient.subscribe(user, mediaType);
            console.log("userhere", user);
            if (mediaType === 'video') {
                setUsers(prevUsers => [...prevUsers, user])
            }
            if (mediaType === 'audio') {
                user.audioTrack.play();
            }
        }

        const handleUserMute = (user, mediaType) => {
            if (mediaType === 'video') {
                // if (user.videoTrack) user.videoTrack.stop();
                setUsers(prevUsers => prevUsers.filter(u => u.uid !== user.uid))
            }
            if (mediaType === 'audio') {
                if (user.audioTrack) user.audioTrack.stop();
            }
        }

        const handleUserLeft = user => {
            setUsers(prevUsers => prevUsers.filter(u => u.uid !== user.uid))
        }


        rtcClient.on('user-published', handleUserJoined);
        rtcClient.on('user-unpublished', handleUserMute)
        rtcClient.on('user-left', handleUserLeft);

        rtcClient
            .join(APP_ID, videoRoomID, TOKEN, userID)
            .then((uid) =>
                Promise.all([
                    AgoraRTC.createMicrophoneAndCameraTracks({}, {
                        encoderConfig: {
                            width: { min: 640, ideal: 1920, max: 1920 },
                            height: { min: 480, ideal: 1080, max: 1080 }
                        }
                    }),
                    uid,
                ])
            )
            .then(([tracks, uid]) => {
                const [audioTrack, videoTrack] = tracks;
                setLocalTracks(tracks);
                setUsers((previousUsers) => [
                    ...previousUsers,
                    {
                        uid,
                        videoTrack,
                        audioTrack,
                    },
                ]);
                rtcClient.publish(tracks);
            });
        rightSide = document.querySelector('.right-side');
        expandBtn = document.querySelector('.expand-btn');
    }, []);


    const leaveChannel = async () => {
        await chatChannel.leave();
        await codeChannel.leave();
        await rtmClient.logout();
        await rtcClient.leave();
        rtcClient.removeAllListeners();
        setJoined(false);
        setRoomName("")
        setUserName("")
        setinvitationLink("")
    }

    window.addEventListener('beforeunload', leaveChannel)

    if (!joined) {
        leaveChannel();
    }



    // switch to dark-mode
    const switchModeHandler = () => {
        const body = document.querySelector('body');
        body.classList.toggle('dark');
    }

    const closeGroupChat = () => {
        console.log("close");
        rightSide.classList.remove('show');
        expandBtn.classList.add('show');
    }

    const expandGroupChat = () => {
        console.log("expand");
        rightSide.classList.add('show');
        expandBtn.classList.remove('show');
    }

    const clickDisplayVideo = () => {
        setDisplayVideo(true);
        const navVid = document.querySelector('#nav-vid')
        const navCode = document.querySelector('#nav-code')
        const navTopVid = document.querySelector('#nav-top-vid')
        const navTopCode = document.querySelector('#nav-top-code')
        navVid.classList.add('nav-selected')
        navCode.classList.remove('nav-selected')
        navTopVid.classList.add('nav-selected')
        navTopCode.classList.remove('nav-selected')
    }

    const clickCodeEditor = () => {
        setDisplayVideo(false)
        const navVid = document.querySelector('#nav-vid')
        const navCode = document.querySelector('#nav-code')
        const navTopVid = document.querySelector('#nav-top-vid')
        const navTopCode = document.querySelector('#nav-top-code')
        navCode.classList.add('nav-selected')
        navVid.classList.remove('nav-selected')
        navTopCode.classList.add('nav-selected')
        navTopVid.classList.remove('nav-selected')
    }

    return (
        <>
            <FullScreen handle={videoDiv}>
                <div className="app-container">
                    {/* >>>>>>day/night mode switch btn<<<<<<<<*/}
                    <button className="mode-switch" onClick={() => switchModeHandler()}>
                        {/* sun */}
                        <svg
                            fill="none"
                            stroke="#fbb046"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="feather feather-sun sun"
                            viewBox="0 0 24 24"
                        >
                            <defs />
                            <circle cx="12" cy="12" r="5" />
                            <path
                                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                            />
                        </svg>

                        {/* moon */}
                        <svg
                            fill="none"
                            stroke="#ffffff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="feather feather-moon moon"
                            viewBox="0 0 24 24"
                        >
                            <defs />
                            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                        </svg>
                    </button>

                    {/* >>>>>>>>Vertical side bar<<<<<<<< */}
                    <div className="left-side">
                        <div className="navigation">
                            <div className="room-nav-link icon nav-selected" title="Video chat" id='nav-vid' onClick={() => clickDisplayVideo()}>
                                <img src={videoChatIcon} alt='videoChat' />
                            </div>
                            <div className="room-nav-link icon" title="Code editor" id='nav-code' onClick={() => clickCodeEditor()} >
                                <img src={codeIcon} alt='codeIcon' />
                            </div>
                        </div>
                    </div>

                    {/* >>>>>>>>Phone size Top nav bar<<<<<<<< */}
                    <div className="top-side">
                        <button className="mode-switch-top" onClick={() => switchModeHandler()}>
                            {/* sun */}
                            <svg
                                fill="none"
                                stroke="#fbb046"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="feather feather-sun sun"
                                viewBox="0 0 24 24"
                            >
                                <defs />
                                <circle cx="12" cy="12" r="5" />
                                <path
                                    d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                                />
                            </svg>

                            {/* moon */}
                            <svg
                                fill="none"
                                stroke="#ffffff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="feather feather-moon moon"
                                viewBox="0 0 24 24"
                            >
                                <defs />
                                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                            </svg>
                        </button>

                        <div className="navigation">
                            <div className="room-top-nav-link" title="Video chat" id='nav-top-vid' onClick={() => clickDisplayVideo()}>
                                <img src={videoChatIcon} alt='videoChat' />
                            </div>
                            <div className="room-top-nav-link" title="Code editor" id='nav-top-code' onClick={() => clickCodeEditor()} >
                                <img src={codeIcon} alt='codeIcon' />
                            </div>
                        </div>

                        <button className="expand-btn" onClick={() => expandGroupChat()}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                class="feather feather-message-circle"
                            >
                                <path
                                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* >>>>>>>>Video Chat & Code editor<<<<<<<< */}
                    <div className="app-main">
                        <MainHeader roomNameTitle={roomNameTitle} ROOMID={ROOMID} />
                        {displayVideo && <Video userID={userID} joined={joined} setJoined={setJoined} videoRoomID={videoRoomID} userName={userName} rtcClient={rtcClient} localTracks={localTracks} users={users} videoDiv={videoDiv} leaveRTMchannel={leaveChannel} rtmClient={rtmClient} />}

                        {!displayVideo && <Compiler codeChannel={codeRoom} code={code} setCode={setCode} output={output} setOutput={setOutput} outputChannel={outputRoom} />}
                    </div>

                    {/* >>>>>>>>Chat room<<<<<<<< */}
                    <div className="right-side">
                        <button className="btn-close-right" onClick={() => closeGroupChat()}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="feather feather-x-circle"
                                viewBox="0 0 24 24"
                            >
                                <defs></defs>
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M15 9l-6 6M9 9l6 6"></path>
                            </svg>
                        </button>

                        <div className="chat-container">
                            <div className="chat-header">
                                <p>Group chat</p>
                                <button className="chat-header-button" onClick={() => setDisplayVideo(true)}>Participants: {count}</button>
                            </div>
                            <Groupchat text={text} setText={setText} userID={userID} userName={userName} messages={messages} setMessages={setMessages} chatChannel={chatChannel} />
                        </div>
                    </div>

                    {/* >>>>>>>>Chat room<<<<<<<< */}
                    <button className="expand-btn-right" onClick={() => expandGroupChat()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            class="feather feather-message-circle"
                        >
                            <path
                                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                            />
                        </svg>
                    </button>
                </div>
            </FullScreen>
        </>
    )

}

export default Room;