import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import AgoraRTM from 'agora-rtm-sdk';

const APP_ID = '86d08ec509d84630934da8b1905aa145';
const CHANNEL_NAME = 'wdj';
const client = AgoraRTM.createInstance(APP_ID);
//When the app first loads we will get a unique id for our react app.
const uid = uuid();

const ChatApp = () => {
  const [text, setText] = useState('');
  const [channel, setChannel] = useState();
  const [messages, setMessages] = useState([]); // We need to keep appending messages to this array when new mssages are recieved
  const messagesRef = useRef();

  useEffect(() => {
    const connect = async () => {
      await client.login({ uid, token: null });
      const channel = await client.createChannel(CHANNEL_NAME);
      await channel.join();

      // As the messages come in we will append them to the messages array.
      channel.on('ChannelMessage', (message, memberId) => {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            uid: memberId,
            text: message.text,
          },
        ]);
      });

      setChannel(channel);
      return channel;
    };
    // This is the promise chain, gives us access to the variable channel.
    const connection = connect();

    // This fundtion will prevent having two messages show up. This unmounts/cleans up the connects of the useEffect.
    return () => {
      const logout = async () => {
        const channel = await connection;
        await channel.leave();
        await client.logout();
      };
      logout();
    };
  }, []);

  // This useEffect will be used to listen for new messages added into the array and then it will scroll down to the newly added message.
  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = (e) => {
    // This will prevent the from from refeshing the page
    e.preventDefault();
    if (text === '') return;

    channel.sendMessage({ text, type: 'text' });
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        uid,
        text,
      },
    ]);
    setText('');
  };

  return (
    <main className='chatApp border border-black'>
      {/* We will loop through the messages array and for every message that we get we will return a new jsx object  */}
      <div className='panel'>
        <div className='messages' ref={messagesRef}>
          {messages.map((oneMessage, i) => (
            <div key={i} className='message'>
              {oneMessage.uid === uid && <div className='user-self'>You: </div>}
              {oneMessage.uid !== uid && (
                <div className='user-them'>Them: </div>
              )}
              <div className='text'>{oneMessage.text}</div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage}>
          <input
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          ></input>
          <button className='bg-blue-300'>Send</button>
        </form>
      </div>
    </main>
  );
};

export default ChatApp;
