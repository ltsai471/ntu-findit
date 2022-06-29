import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ChatItem from "./ChatItem";
import i18n from 'i18next';

export default function ChatList(props) {
    const divStyle = {
        padding: '5px 5px 5px 5px',
    };

    // const changeLanguage= (val) => {
    //         i18n.changeLanguage(val); // val入參值為'en'或'zh'
    //     };
    // changeLanguage('en')
    const buttonDivStyle = {
        width: '386px',
        height: '102px',
        'align-items': 'center',
    };

    // const rows = [];
    // if (props.chat.length > 0) {
    //     props.chat.forEach((chat) => {
    //         rows.push(
    //             <ChatItem
    //                 chat={chat}
    //                 key={chat.chatroomId}
    //                 changeChatroom={props.changeChatroom.bind(chat.chatroomId)} />
    //         );
    //         rows.push(
    //             <Divider variant="inset" component="li" />
    //         );
    //     });
    // }
    // else {
    //     rows.push(
    //         <ListItem>
    //             <ListItemText
    //                 primary="沒有聊天紀錄"
    //             />
    //         </ListItem>
    //     );
    // }
    const rows = props.chat.map((chat, index) =>
        <ChatItem
            chat={chat}
            key={chat.chatroomId}
            index={index}
            changeChatroom={props.changeChatroom} />
    );

    return (
        <div style={divStyle}>
            <>
                <div style={buttonDivStyle}>
                    <Stack direction="row" spacing={5} justifyContent="center" sx={{ 'vertical-align': 'middle' }}>
                        <Button variant="contained" color="success">{i18n.t('chatlist.All')}</Button>
                        <Button variant="contained" color="primary">{i18n.t('chatlist.Lost')}</Button>
                        <Button variant="contained" color="success">{i18n.t('chatlist.Found')}</Button>
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
