import MainEditor from './editor'
import { React, useState, useEffect } from 'react';
import io from 'socket.io-client'
import axios from "axios";

import CodeEditor from '@uiw/react-textarea-code-editor';

const Compiler = props => {
    const { code, setCode, codeChannel } = props


    const [language, setLanguage] = useState("py")
    const [result, setResult] = useState("#Your output will show up here")
    // use socket from io, in default return an anonymous function that calls io and passes in our server port(8000)
    const [socket] = useState(() => io(':80'))
    //
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('error', (error) => {
            console.error(`Socket connection error: ${error}`);
        });

        // listen from the server
        socket.on("result sending back from socket", (resultFromUser) => {
            setResult(resultFromUser);
        })

        return () => socket.disconnect(true)
    }, [socket])

    const resultSocketHandler = (compliedCode) => {
        socket.emit("result sending to socket", compliedCode)
    }

    const submitCode = () => {
        console.log("i am copiler file, here is the code channel........", codeChannel)
        console.log("trying to send testcode to backend", language);
        try {
            axios
                .post('http://localhost:8000/api/compile', { code, language })
                .then((res) => {
                    if (res.data.error) {
                        resultSocketHandler(res.data.error)
                    } else {
                        resultSocketHandler(res.data.output)
                    }
                });
        } catch ({ response }) {
            setResult("error to server!")
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
                    <option value="py">Python</option>
                    <option value="java">Java</option>
                    <option value="js">javascript</option>
                </select>
                <button onClick={submitCode} style={{ zIndex: "100" }}>Run</button>
                <MainEditor language={language} codeChannel={codeChannel} code={code} setCode={setCode} />


                <h4>output:</h4>
                <CodeEditor
                    value={result}
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