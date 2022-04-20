import React, { useState, useEffect } from 'react';
import ChatList from "./ChatList";
import MessageWindow from "./MessageWindow";
import Grid from "@mui/material/Grid";

export default function ChatroomContainer() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    // const [query, setQuery] = useState();
    // const submitQuery = (e) => {
    //   e.preventDefault();
    //   getOrders(query).then((result) => {
    //     setOrders(result);
    //   });
    // };
    const divStyle = {
        height: '100vh',
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3} style={divStyle}>
                <ChatList />
            </Grid>
            {/* <MessageList orders={orders} /> */}
            <Grid item xs={12} md={9} style={divStyle}>
                <MessageWindow />
            </Grid>
        </Grid>
    );
}