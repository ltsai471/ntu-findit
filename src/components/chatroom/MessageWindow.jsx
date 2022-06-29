import React, { Component, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import MessageItem from "./MessageItem";
import { themeColor } from '../../config';

export default function MessageWindow(props) {
    const chat = props.chat;
    const [loading, setLoading] = useState(true);
    const rows = [];
    if (chat.msgList.length > 0) {
        chat.msgList.forEach((msg) => {
            rows.push(
                <MessageItem
                    fromMe={msg.sendAccount == '我' ? true : false}
                    photo={chat.photo} //my photo error
                    sendAccount={msg.sendAccount}
                    context={msg.context}
                />
            );
        });
    }

    const divStyle = {
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': '#E5E7E9',
        padding: '5px',
        height: '100vh',
    };

    const windowStyle = {
        height: '80vh',
    };

    const inputStyle = {
        'border-radius': '10px',
    };

    const verticalCenter = {
        margin: 0,
        position: 'relative',
        top: '50%',
        '-ms-transform': 'translateY(-50%)',
        transform: 'translateY(-50%)',
        color: themeColor["primary"],
    };


    return (
        <div className="chat-app_right" style={divStyle}>
            <Typography variant="h5" component="div" gutterBottom align="center">
                {chat.target}
            </Typography>
            <Divider variant="middle" />
            <div className="message-list" style={windowStyle}>
                {rows}
            </div>
            <Box sx={{ position: 'absolute', bottom: 0, width: '70%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={11}>
                        <TextField
                            id="filled-basic"
                            hiddenLabel
                            variant="filled"
                            sx={{ width: '100%' }}
                            value={props.newMessage}
                            onChange={props.messageChange}
                            // onKeyDown={props.handleKeyDown}
                             />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <IconButton size="large" style={verticalCenter} onClick={props.sendMsg} >
                            <SendIcon fontSize="inherit" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}