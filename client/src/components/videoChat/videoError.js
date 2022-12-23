import '../mainStyles/mainRoom.css'
import { AiOutlineArrowRight } from 'react-icons/ai';


const VideoError = ({leaveRoom}) => {

    return (
        <>
            <div className='video-full-container'>
                <div className='w-[100%] h-[100%] flex flex-col items-center justify-center error-container'>
                    <h1 className='md:text-4xl sm:text-3xl text-base font-bold text-grey-400 md:pl-4 pl-2 my-10 text-center'>
                        Your video chat feature is currently unavailable
                    </h1>
                    <h1 className='md:text-2xl sm:text-1xl text-sm font-bold text-grey-200 my-3 text-center'>
                        Here are some solutions:
                    </h1>
                    <ul className='md:text-2xl sm:text-1xl text-sm text-grey-100 text-center'>
                        <li className='my-1' >
                            1. Allow the site to access your camera & audio
                            <br/>
                            (Browser setting <AiOutlineArrowRight className='inline-block'/> Permissions <AiOutlineArrowRight className='inline-block'/> Camera / audio)
                        </li>
                        <li className='my-1' >
                            2. Try to open this website on your other browsers / Devices (Phone and tablet supported)
                        </li>
                    </ul>
                    <button className='w-[200px] rounded-md font-medium my-10 mx-auto py-3 text-white border bg-black hover:bg-white hover:text-black hover:border-black' onClick={() => leaveRoom()}>
                        Leave Room
                    </button>
                </div>

            </div>
        </>
    )
}

export default VideoError;