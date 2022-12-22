import React, { useState } from 'react';
import VideoPlayer from './videoPlayer';
import VideoControl from './videoControl';

import '../mainStyles/mainRoom.css'


// -- Agora(RTC, RTM) import
import AgoraRTC from 'agora-rtc-sdk-ng';
var localScreenTrack;

const Video = props => {
    const { setJoined, rtcClient, localTracks, users, videoDiv, leaveRTMchannel, rtmClient, trackState, setTrackState } = props
    const [screenShareState, setScreenShareState] = useState(false)

    const shareScreenHandler = async () => {
        const childDiv = document.querySelector('#local-screen-share div');
        setScreenShareState(true)
        if (childDiv !== null) {
            childDiv.remove();
        }   

        localScreenTrack = await AgoraRTC.createScreenVideoTrack()
        localScreenTrack.play('local-screen-share')
        await rtcClient.unpublish([localTracks[1]])
        await rtcClient.publish([localScreenTrack])
    }

    const closeShareScreenHandler = async () => {
        await rtcClient.unpublish([localScreenTrack])
        await rtcClient.publish([localTracks[1]])
        const childDiv = document.querySelector('#local-screen-share div');
        setScreenShareState(false)
        if (childDiv !== null) {
            childDiv.remove();
        }
    }

    return (
        <div className='video-component-container'>
            <div className='video-call-wrapper'>
                {!screenShareState && users.map((user) => (
                    <VideoPlayer key={user.uid} user={user} idx={user.uid} users={users} rtmClient={rtmClient} />
                ))}
                {screenShareState && <div
                    id='local-screen-share'
                    className='video-full-container'
                ></div>}
            </div>

            <div className="video-call-actions">
                <VideoControl rtcClient={rtcClient} tracks={localTracks} setJoined={setJoined} videoDiv={videoDiv} trackState={trackState} setTrackState={setTrackState} leaveRTMchannel={leaveRTMchannel} shareScreenHandler={shareScreenHandler} closeShareScreenHandler={closeShareScreenHandler} screenShareState={screenShareState}/>
            </div>
        </div>
    )
}

export default Video;