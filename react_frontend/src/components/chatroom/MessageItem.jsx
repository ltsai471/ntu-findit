import React, { Component, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from "@mui/material/Grid";

export default function MessageItem() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const msgStyle = {
        'background-color': 'light-blue',
    };

    // const { fromMe, text} = this.props;
    // return (
    //   <div className={`message-item ${fromMe ? 'message-from-me' : 'message-from-other'}`}>
    //     <span>{text}</span>
    //   </div>
    // );

    return (
        <div className="message-item message-from-other">
            <Box component="div" sx={{ width: '100vh' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Typography variant="body1" gutterBottom>
                            陳小花
                        </Typography>
                    </Grid>
                </Grid>
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