import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ChatItem from "./ChatItem";

export default function ChatList(props) {
    const divStyle = {
        padding: '5px 5px 5px 5px',
    };

    const buttonDivStyle = {
        width: '386px',
        height: '102px',
        'align-items': 'center',
    };

    const rows = [];
    if (props.chat.length > 0) {
        props.chat.forEach((chat) => {
            rows.push(
                <ChatItem
                    chat={chat}
                    key={chat.chatroomId} />
            );
            rows.push(
                <Divider variant="inset" component="li" />
            );
        });
    }
    else {
        rows.push(
            <ListItem>
                <ListItemText
                    primary="沒有聊天紀錄"
                />
            </ListItem>
        );
    }


    return (
        <div style={divStyle}>
            <>
                <div style={buttonDivStyle}>
                    <Stack direction="row" spacing={5} justifyContent="center" sx={{ 'vertical-align': 'middle' }}>
                        <Button variant="contained" color="success">全部</Button>
                        <Button variant="contained" color="primary">遺失</Button>
                        <Button variant="contained" color="success">拾獲</Button>
                    </Stack>
                </div>
            </>
            <>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {rows}
                </List>
            </>
        </div>
    );
}
