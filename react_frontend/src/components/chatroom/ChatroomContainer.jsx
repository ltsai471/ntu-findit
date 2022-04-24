import React, { useState, useEffect } from 'react';
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
  // const [query, setQuery] = useState();
  // const submitQuery = (e) => {
  //   e.preventDefault();
  //   getOrders(query).then((result) => {
  //     setOrders(result);
  //   });
  // };

  // const initialState = {
  //     newMessage: '',
  //     threads: [
  //       {
  //         target: {
  //           name: 'Elsa',
  //           profilePic: 'http://lorempixel.com/50/50/people/1'
  //         },
  //         messages: [
  //           { fromMe: false, text: '蛤？', time: '12:27am' },
  //           { fromMe: false, text: '來來來～', time: '12:27am' },
  //           { fromMe: false, text: '靠左邊嗎？', time: '12:27am' },
  //           { fromMe: true, text: '換我了！', time: '12:27am' },
  //           { fromMe: true, text: '有看到嗎？', time: '12:27am' },
  //         ]
  //       },
  //       {
  //         target: {
  //           name: 'Katharine',
  //           profilePic: 'http://lorempixel.com/50/50/people/9'
  //         },
  //         messages: [
  //           { fromMe: false, text: '對啊！', time: '12:27am' },
  //         ]
  //       },
  //       {
  //         target: {
  //           name: 'Marshall',
  //           profilePic: 'http://lorempixel.com/50/50/people/7'
  //         },
  //         messages: [
  //           { fromMe: false, text: '好呦～', time: '12:27am' },
  //         ]
  //       }
  //     ],
  //     currentIndex: 0
  //   };

  //   handleMessageChange(event) {
  //     this.setState({ newMessage: event.target.value });
  //   }

  //   handleMessagerChange(event) {
  //     this.setState({ currentIndex: event });
  //   }

  //   handleKeyDown(event) {
  //     const message = event.target.value;
  //     const time = new Date().toDateString();
  //     const addMessage = {fromMe: true, text: message, time: time};

  //     if (event.keyCode === 13 && message !== '') {
  //       const {threads, currentIndex} = this.state;
  //       threads[currentIndex].messages.push(addMessage);

  //       this.setState({
  //         newMessage: '',
  //         threads: threads
  //       });
  //     }
  //   }

  //css
  const divStyle = {
    height: '100vh',
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} style={divStyle}>
        <ChatList chat={chat} />
      </Grid>
      <Grid item xs={12} md={9} style={divStyle}>
        <MessageWindow chat={chat[currentIndex]} />
      </Grid>
    </Grid>
  );
}