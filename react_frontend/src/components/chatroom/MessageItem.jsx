import React, { Component, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';

export default function MessageItem() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const msgStyle = {
        'background-color': 'light-blue',
    };    

    return (
        <div className="message-item message-from-other">
            <Box component="div" sx={{ width: '100vh' }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ display: 'inline', width: '20%' }} />
                <Typography variant="body1" gutterBottom sx={{ display: 'inline', width: '80%' }}>
                    陳小花
                </Typography>
            </Box>
            <Typography variant="body1" component="div" gutterBottom style={msgStyle}>
                對啊
            </Typography>
        </div>
        // <div className="message-item message-from-other">
        //     <span>試著</span>
        // </div>
        // <div className="message-item message-from-other">
        //     <span>靠左邊嘛</span>
        // </div>
        // <div className="message-item message-from-me">
        //     <span>換我了</span>
        // </div>
        // <div className="message-item message-from-me">
        //     <span>有看到嗎</span>
        // </div>
    );
}