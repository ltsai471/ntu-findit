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
import ChatItem from "./ChatItem";


export default function ChatList() {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ChatItem />
        </List>
    );
}
