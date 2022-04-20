import React, { Component } from 'react';

export default function ChatItem() {
    return (
        <li className="thread-item">
            <a href="#" className="_1ht5 _5l-3">
                <div className="clearfix">
                    <div className="thread-item_left">
                        {/* <img className="img-circle" src="http://lorempixel.com/50/50/people/1" width="50" height="50" alt="" className="img" /> */}
                    </div>
                    <div className="thread-item_right">
                        <div className="thread-from">
                            Elsa
                        </div>
                        <div>
                            <span className="thread-content">: )</span>
                        </div>
                        <span className="thread-time">12:27am</span>
                    </div>
                </div>
            </a>
        </li>
    );

}