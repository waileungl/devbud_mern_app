
import { useNavigate } from "react-router-dom";
import '../mainStyles/mainRoom.css'

// all the icon needed
import micOn from './toggleVideoIcon/mic-on.png'
import micOff from './toggleVideoIcon/mic-off.png'
import camOn from './toggleVideoIcon/cam-on.png'
import camOff from './toggleVideoIcon/cam-off.png'
import enterFullScreen from './toggleVideoIcon/fullscreen.png'
import exitFullScreen from './toggleVideoIcon/exitFullscreen.png'

export default function VideoControl(props) {
    const { rtcClient, tracks, setJoined, videoDiv, trackState, setTrackState, leaveRTMchannel } = props;
    
    const navigate = useNavigate();

    const mute = async (mediaType) => {
        if (mediaType === "audio") {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState(ps => {
                return { ...ps, audio: !ps.audio };
            });
        }
        if (mediaType === "video") {
            await tracks[1].setEnabled(!trackState.video);
            setTrackState(ps => {
                return { ...ps, video: !ps.video };
            });
        }
    };

    const fullScreenHandler = () => {
        if(document.fullscreenElement){
            videoDiv.exit()
        }
        if(!document.fullscreenElement){
            videoDiv.enter()
        }
    }

    const leaveChannel = async () => {
        await rtcClient.leave();
        rtcClient.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setJoined(false);
        leaveRTMchannel();
    };

    return (
        <>

            <img className="video-action-button" onClick={() => mute("video")} src={trackState.video ? camOn : camOff} alt='cam' />
            <img className="video-action-button" onClick={() => mute("audio")} src={trackState.audio ? micOn : micOff} alt='mic' />
            <img className="video-action-button" onClick={() => fullScreenHandler()} src={document.fullscreenElement ? exitFullScreen: enterFullScreen} alt='fullscreen' />
            <button className="video-action-button endcall"  onClick={() => leaveChannel()}>Leave</button>
        </>
    )
} 