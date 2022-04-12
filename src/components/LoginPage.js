import React, { useState, useContext } from 'react';
// import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { login, verifyAccount } from "../webAPI";
import { setAuthToken } from "../utils";
import AuthContext from "../contexts";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password).then((data) => {
            if (data.token == null) {
                setLoading(false);
                alert('Login failed');
                return setErrorMessage('Login failed');
            }
            setAuthToken(data.token);
            verifyAccount().then((response) => {
                if (data.token == null) {
                    setAuthToken(null);
                    alert('Error when getting user data');
                    setErrorMessage('Error when getting user data');
                }
                setUser(response.token);
                navigate("/");
            });
        });
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="home">
            <div class="container">
                <div>
                    <span>Username:</span>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsername}
                    />
                </div>
                <div>
                    <span>Password:</span>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePassword}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </div>
        </div>
    );
}