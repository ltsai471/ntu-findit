import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getAuthToken } from "./utils";
import { verifyAccount } from "./webAPI";
import AuthContext from "./contexts";
import {
    LoginPage,
    Navigation,
    Footer,
    OrderListContainer,
    OrderDetail,
} from "./components";


export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (getAuthToken()) {
            verifyAccount().then((response) => {
                if (response.token != null) {
                    setUser(response.token);
                }
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<OrderListContainer />} />
                    <Route path="/:orderDetail" element={<OrderDetail />} />
                </Routes>
                <Footer />
            </Router>
        </AuthContext.Provider>
    );
}
