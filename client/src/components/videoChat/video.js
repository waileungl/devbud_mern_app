import React, { useState } from 'react';
import VideoPlayer from './videoPlayer';
import VideoControl from './videoControl';

import '../mainStyles/mainRoom.css'



const Video = props => {
    const { setJoined, rtcClient, localTracks, users, videoDiv, leaveRTMchannel, rtmClient } = props
    const [trackState, setTrackState] = useState({ video: true, audio: true });


    return (
        <>
            <div className='video-call-wrapper'>
                {users.map((user) => (
                    <VideoPlayer key={user.uid} user={user} idx={user.uid} users={users} rtmClient={rtmClient}/>
                ))}
            </div>

            <div className="video-call-actions">
                <VideoControl rtcClient={rtcClient} tracks={localTracks} setJoined={setJoined} videoDiv={videoDiv} trackState={trackState} setTrackState={setTrackState} leaveRTMchannel={leaveRTMchannel} />
            </div>
        </>
    )
}

export default Video;