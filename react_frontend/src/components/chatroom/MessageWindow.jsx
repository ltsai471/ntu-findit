import React, { Component, useState, useEffect } from 'react';
import MessageItem from "./MessageItem";

export default function MessageWindow() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    return (
        <div className="chat-app_right">
            <div className="heading">
                <div className="current-target">Elsa</div>
            </div>
            <div className="message-list">
                <MessageItem />
            </div>
            <div className="footer">
                <input className="new-message" type="text" />
            </div>
        </div>
    );
}