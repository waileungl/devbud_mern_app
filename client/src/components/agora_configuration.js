import AgoraRTC from 'agora-rtc-sdk-ng';
import AgoraRTM, { RtmClient } from 'agora-rtm-sdk'

// Initial configuration
export const APP_ID = "1186a57258e94a27b56062e6ce07095e";
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