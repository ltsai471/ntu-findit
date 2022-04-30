import React, { useState, useEffect, useCallback } from 'react';
import ChatList from "./ChatList";
import MessageWindow from "./MessageWindow";
import Grid from "@mui/material/Grid";

export default function ChatroomContainer() {
  const initChat = [
    {
      chatroomId: 1,
      target: '陳小花',
      photo: '',
      caseName: '遺失案件－學生證',
      msgList: [
        {
          context: '約公館站2號出口可以ㄇ',
          sendAccount: '我',
          sendDatetime: ''
        },
        {
          context: '好ㄟ那我跟你約公館站2號出口喔wwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
          sendAccount: '陳小花',
          sendDatetime: ''
        }
      ]
    },
    {
      chatroomId: 2,
      target: '王大明',
      photo: '',
      caseName: '遺失案件－身分證',
      msgList: [
        {
          context: '我是放原地欸',
          sendAccount: '王大明',
          sendDatetime: ''
        },
        {
          context: '好的',
          sendAccount: '我',
          sendDatetime: ''
        }
      ]
    }
  ];
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState(initChat);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newMessage, setNewMessage] = useState('');

  const changeChatroom = useCallback(
    (e) => {
      setCurrentIndex(e.currentTarget.getAttribute("value"));
    },
    [],
  );

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMsg = (e) => {
    const time = new Date().toDateString();
    const addMessage = {
      context: newMessage,
      sendAccount: '我',
      sendDatetime: time
    };

    // if (e.keyCode === 13 && newMessage !== '') {
    if (newMessage !== '') {
      chat[currentIndex].msgList.push(addMessage);
      setChat(chat);
    }
    setNewMessage('');
  };

  const divStyle = {
    height: '100vh',
  };

  useEffect(() => {
    document.title = `currentIndex: ${currentIndex}`;
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3} style={divStyle}>
        <ChatList chat={chat} changeChatroom={changeChatroom} />
      </Grid>
      <Grid item xs={12} sm={6} md={9} style={divStyle}>
        <MessageWindow
          chat={chat[currentIndex]}
          newMessage={newMessage}
          messageChange={handleMessageChange}
          sendMsg={sendMsg} />
      </Grid>
    </Grid>
  );
}