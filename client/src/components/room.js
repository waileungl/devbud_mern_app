import { useParams } from "react-router";
import React, { useState, useEffect } from 'react';
import { usertmClient } from './agora_configuration';
import Compiler from './codeEditor_components/compiler';
import Groupchat from './groupChat_components/groupChat';
import Video from "./videoStream_components/video";
import { useNavigate } from "react-router-dom";

// ---RTC import
import AgoraRTC from 'agora-rtc-sdk-ng';

import { APP_ID, TOKEN, usertcClient } from './agora_configuration';


import videoChatIcon from './mainStyles/navigation_icons/videoChat.png'
import homeIcon from './mainStyles/navigation_icons/home.png'
import codeIcon from './mainStyles/navigation_icons/code.png'
import './mainStyles/mainRoom.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import MainHeader from "./header_components/mainHeader";

var codeChannel;
var chatChannel;
var rtmClient = usertmClient();
var rtcClient = usertcClient();
var nameByID;
var roomNameTitle;
var memberCount;

const Room = props => {
    const { ROOMID } = useParams();
    const { joined, setJoined, userID, userName, setRoomName, setinvitationLink, setUserName } = props;
    const [code, setCode] = useState(" ")
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])
    const [codeRoom, setCodeRoom] = useState({})
    const [count, setCount] = useState('')
    const navigate = useNavigate();
    const [displayVideo, setDisplayVideo] = useState(true)

    // RTC hook
    const [localTracks, setLocalTracks] = useState([]);
    const [users, setUsers] = useState([]);

    var videoRoomID = "video" + ROOMID
    var chatRoomID = "chat" + ROOMID
    var codeRoomID = "code" + ROOMID

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
                setCode(codeFromOther)
            });
            // Have to store that into a hook otherwise it won't pass to the next level component
            setCodeRoom(codeChannel)
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
        navigate('/room')
    }

    window.addEventListener('beforeunload', leaveChannel)

    if (!joined) {
        leaveChannel();
    }
    const backgroundColorForVideoChat = displayVideo ? '#3c3f56' : 'white';
    const backgroundColorForCodeEditor = !displayVideo ? '#3c3f56' : 'white';

    return (
        <>
            <FullScreen handle={videoDiv}>
                <div className="app-container">
                    {/* >>>>>>>mode switch button<<<<<<<<< */}
                    <button class="mode-switch">
                        {/* <-- sun icon --> */}
                        <svg
                            class="sun"
                            fill="none"
                            stroke="#fbb046"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="feather feather-sun"
                            viewBox="0 0 24 24"
                        >
                            <defs />
                            <circle cx="12" cy="12" r="5" />
                            <path
                                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                            />
                        </svg>
                        {/* <-- sun icon --> */}

                        {/* <-- moon icon --> */}
                        <svg
                            class="moon"
                            fill="none"
                            stroke="#ffffff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="feather feather-moon"
                            viewBox="0 0 24 24"
                        >
                            <defs />
                            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                        </svg>
                        {/* <-- moon icon --> */}
                    </button>
                    {/* >>>>>>>>Vertical side bar<<<<<<<< */}
                    <div className="left-side">
                        <div className="navigation">
                            <div className="room-nav-link icon" title="Video chat" style={{ backgroundColor: backgroundColorForVideoChat }} onClick={() => {
                                setDisplayVideo(true)
                            }}>
                                <img src={videoChatIcon} alt='videoChat' />
                            </div>
                            <div className="room-nav-link icon" title="Code editor" style={{ backgroundColor: backgroundColorForCodeEditor }} onClick={() => {
                                setDisplayVideo(false)
                            }} >
                                <img src={codeIcon} alt='codeIcon' />
                            </div>
                        </div>
                    </div>

                    {/* >>>>>>>>Video Chat & Code editor<<<<<<<< */}
                    <div className="app-main">
                        <MainHeader roomNameTitle={roomNameTitle} ROOMID={ROOMID} />
                        {displayVideo && <Video userID={userID} joined={joined} setJoined={setJoined} videoRoomID={videoRoomID} userName={userName} rtcClient={rtcClient} localTracks={localTracks} users={users} videoDiv={videoDiv} leaveRTMchannel={leaveChannel} rtmClient={rtmClient} />}

                        {!displayVideo && <Compiler codeChannel={codeRoom} code={code} setCode={setCode} />}
                    </div>

                    {/* >>>>>>>>Chat room<<<<<<<< */}
                    <div className="right-side">
                        <div className="chat-container">
                            <div className="chat-header">
                                <p>Group chat</p>
                                <button className="chat-header-button" onClick={() => setDisplayVideo(true)}>Participants: {count}</button>
                            </div>
                            <Groupchat text={text} setText={setText} userID={userID} userName={userName} messages={messages} setMessages={setMessages} chatChannel={chatChannel} />
                        </div>
                    </div>
                </div>
            </FullScreen>
        </>
    )

}

export default Room;