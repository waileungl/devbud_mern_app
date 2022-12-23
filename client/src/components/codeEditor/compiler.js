import '../mainStyles/mainRoom.css'
import MainEditor from './editor'
import { React, useEffect, useState } from 'react';
import axios from "axios";

import { FaPlay } from 'react-icons/fa';

import CodeEditor from '@uiw/react-textarea-code-editor';

const Compiler = ({ code, codeChannel, output, setOutput, outputChannel, screenShareTrack, rtcClient }) => {
    const [codeToServer, setCodeToServer] = useState("")
    const [language, setLanguage] = useState("js")

    useEffect(() => {
        const stopScreenShare = async() => {
            await rtcClient.unpublish([screenShareTrack])
        }
        stopScreenShare();
    }, [])

    const submitCode = () => {
        console.log("Trying to send testcode to backend...", language);
        try {
            axios
                .post('http://localhost:8000/api/compile', { codeToServer, language })
                .then((res) => {
                    if (res.data.error) {
                        setOutput(res.data.error)
                        outputChannel.sendMessage({ text: res.data.error });
                    } else {
                        setOutput(res.data.output)
                        outputChannel.sendMessage({ text: res.data.output });
                    }
                });
        } catch ({ response }) {
            setOutput("error to server!")
        }
    }

    return (
        <>
            <div className='compiler-container'>

                <nav className='compiler-header'>
                    {/* <h4>Select Language:</h4> */}
                    <div className='compiler-select-menu-wrapper'>
                        {/* <label>Language:</label> */}
                        <select
                            className='compiler-select-menu'
                            value={language}
                            onChange={e => { setLanguage(e.target.value) }}
                        >
                            <option className='compiler-select-menu-option' value="python">Python</option>
                            <option className='compiler-select-menu-option' value="java">Java</option>
                            <option className='compiler-select-menu-option' value="js">Javascript</option>
                        </select>
                    </div>
                    <button onClick={submitCode} className="compile-btn"><FaPlay className='w-[0.5rem] mr-[5px]' />Run</button>
                </nav>
                <MainEditor language={language} codeChannel={codeChannel} code={code} setCodeToServer={setCodeToServer} />

                {/* <h4>Output:</h4> */}
                <div className='output-wrapper'>
                    <CodeEditor
                        value={output}
                        placeholder="#Your output will show up here"
                        padding={20}
                        className="code-output-box"
                    />
                </div>

            </div>
        </>
    )
}

export default Compiler;