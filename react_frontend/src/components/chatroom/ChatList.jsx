// import React, { Component } from 'react';
// import Grid from "@mui/material/Grid";
// import ChatItem from "./ChatItem";

// export default function ChatList() {
//     return (
//         <Grid container spacing={2}>
//             <Grid item xs={12} md={12}>
//                 <span>Messager</span>
//             </Grid>
//             <Grid item xs={12} md={12}>
//                 <ChatItem />
//             </Grid>
//         </Grid>
//     );
// }
import * as React from 'react';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ChatItem from "./ChatItem";
import themeColor from "../../config.js";


export default function ChatList() {
    const divStyle = {

        padding: '5px 5px 5px 5px',
    };

    const buttonDivStyle = {
        width: '386px',
        height: '102px',
        'align-items': 'center',
    };

    return (
        <div style={divStyle}>
            <>
                <div style={buttonDivStyle}>
                    <Stack direction="row" spacing={5} justifyContent="center" sx={{'vertical-align':'middle'}}>
                        <Button variant="contained" color="success">全部</Button>
                        <Button variant="contained" color="primary">遺失</Button>
                        <Button variant="contained" color="success">拾獲</Button>
                    </Stack>
                </div>
            </>
            <>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ChatItem />
                </List>
            </>
        </div>
    );
}
