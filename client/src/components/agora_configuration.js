import AgoraRTC from 'agora-rtc-sdk-ng';
import AgoraRTM from 'agora-rtm-sdk'

// Initial configuration
export const APP_ID = "73153c2b05904f79a80ec9ba54084ad5";
export const TOKEN = null;
export const videoRoomID = 'video';
export const dataRoomID = 'data';
export const codeRoomID = 'code';
export const config = {
    mode: 'rtc',
    codec: 'vp8',
}
export const usertcClient = () => { return AgoraRTC.createClient(config) }
export const usertmClient = () => { return AgoraRTM.createInstance(APP_ID) }