import React, { Component, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from "@mui/material/Grid";
import themeColor from '../../config';

export default function MessageItem() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const verticalCenter = {
        margin: 0,
        position: 'relative',
        top: '50%',
        '-ms-transform': 'translateY(-50%)',
        transform: 'translateY(-50%)',
    };

    const meMsgStyle = {
        background: themeColor["primary"],
        'border-radius': '50px',
        color: 'white',
        padding: '5px 10px 5px 10px',
        width: 'fit-content',
        margin: 0,
        position: 'relative',
        top: '50%',
        '-ms-transform': 'translateY(-50%)',
        transform: 'translateY(-50%)',
    };

    const otherMsgStyle = {
        background: '#cce6d3',
        'border-radius': '50px',
        padding: '5px 10px 5px 10px',
        width: 'fit-content',
        margin: 0,
        position: 'relative',
        top: '50%',
        '-ms-transform': 'translateY(-50%)',
        transform: 'translateY(-50%)',
    };

    const meDivStyle = {
        align: 'right',
        'text-align': 'right',
    };

    // const { fromMe, text} = this.props;
    // return (
    //   <div className={`message-item ${fromMe ? 'message-from-me' : 'message-from-other'}`}>
    //     <span>{text}</span>
    //   </div>
    // );

    return (
        <div className="message-item message-from-other">
            <Box component="div" sx={{ margin: '5px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={1} style={{ 'text-align': 'right', margin: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <span style={otherMsgStyle}>對啊</span>
                    </Grid>
                </Grid>
            </Box>
            {/* <Typography variant="body1" component="div" gutterBottom style={otherMsgStyle}>
                對啊
            </Typography> */}
        </div>

        // <div className="message-item message-from-me" style={meDivStyle}>
        //     <Box component="div" sx={{ margin: '5px' }}>
        //         <Grid container spacing={2}>
        //             <Grid item xs={12} md={10}>
        //                 <span style={meMsgStyle}>對啊</span>
        //             </Grid>
        //             <Grid item xs={12} md={1} style={{ 'text-align': 'right' }}>
        //                 <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        //             </Grid>
        //         </Grid>
        //     </Box>
        // </div>


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