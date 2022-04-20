import React, { Component } from 'react';
import ChatItem from "./ChatItem";

export default function ChatList() {
    return (
        <div className="chat-app_left">
            <div className="heading">
                <h3 className="messenger-title">Messager</h3>
            </div>
            <div className="thread-list">
                <ChatItem />
            </div>
        </div>
    );

}