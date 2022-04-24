import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function ChatItem(props) {
    const chat = props.chat;
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    return (
        <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
        >
            <ListItemAvatar>
                <Avatar alt={chat.target} src={chat.photo} />
            </ListItemAvatar>
            <ListItemText
                primary={chat.caseName}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {chat.msgList[chat.msgList.length - 1].sendAccount}
                        </Typography>
                        {": " + chat.msgList[chat.msgList.length - 1].context}
                    </React.Fragment>
                }
            />
        </ListItemButton>
    );

}