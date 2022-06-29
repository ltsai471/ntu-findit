import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import ChatList from "./ChatList";
import MessageWindow from "./MessageWindow";
import Grid from "@mui/material/Grid";
import { getAuthToken, getLoginUser } from "../../utils";
import { getMsgList, preMessage } from '../../webAPI';

export default function ChatroomContainer() {

  /*
  const queryParams = new URLSearchParams(window.location.search);
  const itemId = queryParams.get('itemId');
  const target = queryParams.get('target'); //name
  const targetAccount = queryParams.get('targetAccount'); //mail
  const photo = queryParams.get('photo');
  const caseName = queryParams.get('caseName');
*/
/*
   const initChat = [
     {
       itemId: itemId,
       chatroomId: 15,
       target: "Yi",
       targetAccount: targetAccount + '@ntu.edu.tw',
       photo: "",
       caseName: "拾獲物－電子產品",
       msgList: [
         {
           "chatroomId": 15,
           "sendAccount": "r10725047@ntu.edu.tw",
           "context": "hfdhfdhfdhfd",
           "sendDatetime": "2022-05-23T21:07:02+08:00"
         },
         {
           "chatroomId": 15,
           "sendAccount": "r10725047@ntu.edu.tw",
           "context": "hhdhfdhdfhd",
           "sendDatetime": "2022-05-23T21:07:06+08:00"
         }
       ]
     }
   ];
*/
   /*
  const initChat = [
    {
      itemId: itemId,
      target: target,
      targetAccount: targetAccount + '@ntu.edu.tw',
      photo: photo,
      caseName: caseName,
      msgList: [
        {
          context: '點擊載入聊天室',
          sendAccount: '',
          sendDatetime: ''
        },
      ]
    }
  ];
  */
  
  const initChat = [
    {
      itemId: '',
      target: ' ',
      targetAccount: '',
      photo: '',
      caseName: '',
      msgList: [
        {
          context: '點擊左側載入聊天室列表',
          sendAccount: '',
          sendDatetime: ''
        },
      ]
    }
  ];

  // get and set username (mail)

  let name = '';
  if (getAuthToken()) {
    name = getLoginUser();
    console.log(name)
  }

  const room = []
  const state = {
    userName: name,
    messages: initChat,
    roomInfo: room
  };


  // if https (deploy)
  const BASE_URL = 'wss://ntulost.herokuapp.com/wss/ntulost/chat/'
  //const BASE_URL = 'ws://localhost:8000/ws/ntulost/chat/'

  const [chat, setChat] = useState(state.messages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [roomInfo, setRoomInfo] = useState(state.roomInfo);

  const ws = useRef(null);
  useEffect(() => {
    
    getMsgList(state.userName).then(
      (data) => {
        initChat.pop()
        for (let i = 0; i < data.length; i++) {
          initChat.push(data[i])
          const targetAccount = data[i].targetAccount.slice(0,9)
          const priority = name.slice(0,9) > targetAccount
          const itemId = data[i].itemId
          let info
          if (priority) {
            //info = name.slice(0, 9) + '_' + targetAccount + '_' + itemId + '_' + Math.floor(Math.random() * 65535)
            info = name.slice(0, 9) + '_' + targetAccount + '_' + itemId + '_' + name.slice(0, 9)
          }
          else {
            //info = targetAccount + '_' + name.slice(0, 9) + '_' + itemId + '_' + Math.floor(Math.random() * 65535)
            info = targetAccount + '_' + name.slice(0, 9) + '_' + itemId + '_' + name.slice(0, 9)
          }
          room.push(info);
        }
        setChat(chat);
        setRoomInfo(roomInfo);
        let url = BASE_URL + state.roomInfo[currentIndex] + '/';
        if (ws.current) {
          ws.current.close();
        }
        ws.current = new WebSocket(url);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");
        ws.current.onmessage = (e) => {
          const message = JSON.parse(e.data);
          // if message send from others
          if (message['sendAccount'] !== state.userName) {
            // change sentAccount from mail to name
            message['sendAccount'] = initChat[currentIndex]['target'];
            chat[currentIndex].msgList.push(message);
            setChat(chat);
            setNewMessage(message['context']);
            setNewMessage('');
          }
          // if message send by myself
          else if (message['sendAccount'] === state.userName) {
            // change sentAccount from mail to me
            message['sendAccount'] = '我';
            chat[currentIndex].msgList.push(message);
            setChat(chat);
            setNewMessage('');
          }
        }
        
        
      } 
    )
    // close connection when leave
    if (ws.current) {
      return () => { ws.current.close(); };
    }
    
    //return () => { ws.current.close(); };
  }, //re-render when setCurrentIndex
    [currentIndex]);

  // send message to group layer
  const sendMsg = (e) => {
    if (newMessage !== '') {
      ws.current.send(JSON.stringify({ 'context': newMessage, 'sendAccount': state.userName }));
    }
  };

  // click chatroom to change room
  const changeChatroom = useCallback(
    (e) => {
      setCurrentIndex(e.currentTarget.getAttribute("value"));
    },
    [],
  );

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const divStyle = {
    height: '100vh',
  };

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
