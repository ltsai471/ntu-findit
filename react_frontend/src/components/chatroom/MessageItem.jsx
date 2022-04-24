import React, { Component, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from "@mui/material/Grid";
import themeColor from '../../config';

export default function MessageItem(props) {
    const [loading, setLoading] = useState(true);
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

    if (props.fromMe) {
        return (
            <div className="message-item message-from-me" style={meDivStyle}>
                <Box component="div" sx={{ margin: '5px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={10}>
                            <span style={meMsgStyle}>{props.context}</span>
                        </Grid>
                        <Grid item xs={12} md={1} style={{ 'text-align': 'right' }}>
                            <Avatar alt={props.sendAccount} src={props.photo} />
                        </Grid>
                    </Grid>
                </Box>
            </div>
        )
    }
    else {
        return (
            <div className="message-item message-from-other">
                <Box component="div" sx={{ margin: '5px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={1} style={{ 'text-align': 'right', margin: 0 }}>
                            <Avatar alt={props.sendAccount} src={props.photo} />
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <span style={otherMsgStyle}>{props.context}</span>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        )
    }

    // return (
    //     // <div className="message-item message-from-other">
    //     //     <Box component="div" sx={{ margin: '5px' }}>
    //     //         <Grid container spacing={2}>
    //     //             <Grid item xs={12} md={1} style={{ 'text-align': 'right', margin: 0 }}>
    //     //                 <Avatar alt={msg.sendAccount} src={msg.photo} />
    //     //             </Grid>
    //     //             <Grid item xs={12} md={10}>
    //     //                 <span style={otherMsgStyle}>{msg.context}</span>
    //     //             </Grid>
    //     //         </Grid>
    //     //     </Box>
    //     // </div>
    //     <div className="message-item message-from-me" style={meDivStyle}>
    //         <Box component="div" sx={{ margin: '5px' }}>
    //             <Grid container spacing={2}>
    //                 <Grid item xs={12} md={10}>
    //                     <span style={meMsgStyle}>{msg.context}</span>
    //                 </Grid>
    //                 <Grid item xs={12} md={1} style={{ 'text-align': 'right' }}>
    //                     <Avatar alt={msg.sendAccount} src={msg.photo} />
    //                 </Grid>
    //             </Grid>
    //         </Box>
    //     </div>


    //     // <div className="message-item message-from-other">
    //     //     <span>試著</span>
    //     // </div>
    //     // <div className="message-item message-from-other">
    //     //     <span>靠左邊嘛</span>
    //     // </div>
    //     // <div className="message-item message-from-me">
    //     //     <span>換我了</span>
    //     // </div>
    //     // <div className="message-item message-from-me">
    //     //     <span>有看到嗎</span>
    //     // </div>
    // );
}