import '../mainStyles/mainRoom.css'
import MainEditor from './editor'
import { React, useState } from 'react';
import axios from "axios";

import CodeEditor from '@uiw/react-textarea-code-editor';

const Compiler = ({ code, setCode, codeChannel, output, setOutput, outputChannel }) => {
    const [codeToServer, setCodeToServer] = useState("")
    const [language, setLanguage] = useState("js")


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
                <h4>Code editor</h4>
                <label>Language:</label>

                <select
                    value={language}
                    onChange={e => { setLanguage(e.target.value) }}
                >
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="js">Javascript</option>
                </select>
                <button onClick={submitCode}>Run</button>
                <MainEditor language={language} codeChannel={codeChannel} code={code} setCodeToServer={setCodeToServer}/>
                <h4>output:</h4>
                <CodeEditor
                    value={output}
                    placeholder="#Your output will show up here"
                    padding={20}
                    style={{
                        fontSize: '0.8rem',
                        width: '1300px',
                        borderRadius: '20px',
                        backgroundColor: '#f5f5f5',
                        height: 'auto',
                        color: 'grey',
                        minHeight: '150px'
                    }}
                />
            </div>
        </>
    )
}

export default Compiler;