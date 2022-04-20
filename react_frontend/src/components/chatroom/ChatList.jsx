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
    return (
        <div>
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" color="success">全部</Button>
                <Button variant="contained" color="primary">遺失</Button>
                <Button variant="contained" color="success">拾獲</Button>
            </Stack>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ChatItem />
            </List>
        </div>
    );
}
