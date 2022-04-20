import React, { Component, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// import { positions } from '@material-ui/system';
import Box from '@mui/material/Box';
import MessageItem from "./MessageItem";

export default function MessageWindow() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const divStyle = {
        'background-color': 'WhiteSmoke',
        height: '100vh',
    };

    const windowStyle = {
        height: '80vh',
    };

    const inputStyle = {
        'border-radius': '10px',
        width: '100%',
    };

    return (
        <div className="chat-app_right" style={divStyle}>
            <Typography variant="h5" component="div" gutterBottom align="center">
                Elsa
            </Typography>
            <Divider variant="middle" />
            <div className="message-list" style={windowStyle}>
                <MessageItem />
            </div>
            <Box sx={{ position: 'absolute', bottom:0, width:'70%' }}>
                <input className="new-message" type="text" style={inputStyle} />
            </Box>
            
        </div>
    );
}