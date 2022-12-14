import React from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor';

var placeholderForCodeEditor;

const MainEditor = props => {
    const { language, codeChannel, code, setCode } = props;

    const onChangeHandler = (e) => {
        codeChannel.sendMessage({ text: e.target.value });
        setCode(e.target.value)
    }

    if (language === "py") placeholderForCodeEditor = "Please enter Python code."
    else if (language === "java") placeholderForCodeEditor = "Please enter Java code."
    else if (language === "js") placeholderForCodeEditor = "Please enter Js code."

    return (
        <>
            <div style={{ overflow: 'auto', height: '500px' }}>
                <CodeEditor
                    value={code.text}
                    language={language}
                    placeholder={placeholderForCodeEditor}
                    onChange={onChangeHandler}
                    padding={20}
                    className='code-editor'
                />
            </div>

        </>
    )
}

export default MainEditor;