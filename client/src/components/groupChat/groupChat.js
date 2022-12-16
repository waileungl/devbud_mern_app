import '../mainStyles/mainRoom.css'
import React, { useRef, useEffect } from 'react';

const Groupchat = props => {
    const { userID, messages, setMessages, chatChannel, userName, text, setText } = props

    const lastMessageRef = useRef(null);

    const appendMessage = (message) => {
        setMessages((messages) => [...messages, message]);
    };

    useEffect(() => {
        if(messages.length === 0) return
        scrollToBottom();
    }, [messages]);

    const sendMessageToChannel = (e) => {
        e.preventDefault();
        if (text === '') return;
        let messagesToChannel = JSON.stringify({ 'type': 'chat', 'message': text, 'displayName': userName })
        chatChannel.sendMessage({ text: messagesToChannel });
        appendMessage({
            text: text,
            displayName: userName,
            userID,
        });
        setText('');
    };

    const scrollToBottom = () => {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <div className='chat-area'>
                {messages.map((message, index) =>
                    <div key={index} className="message-wrapper" ref={index === messages.length - 1 ? lastMessageRef : null}>
                        {!message.notice && message.userID !== userID &&
                            <div className="message-content">
                                <p className="name">{message.displayName}</p>
                                <div className="message">{message.text}</div>
                            </div>}

                        {!message.notice && message.userID && message.userID === userID &&
                            <div className="message-content-self" >
                                <p className="name-self">{message.displayName}</p>
                                {/* <span >{message.currentTime}</span> */}
                                <div className="message-self">{message.text}</div>
                            </div>}

                        {message.notice && <div className="message__body__bot">{message.notice}</div>}
                    </div>
                )}
            </div>
            <form onSubmit={sendMessageToChannel} className="chat-typing-area-wrapper">
                <div className="chat-typing-area">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type your message..."
                        className='chat-input'
                    />
                    <button className="send-button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-send"
                            viewBox="0 0 24 24"
                        >
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                    </button>
                </div>
            </form>
        </>
    )
}

export default Groupchat;