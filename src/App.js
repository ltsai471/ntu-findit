import React, { useState, useEffect } from "react";
import { getAuthToken } from "./utils";
import { verifyAccount } from "./webAPI";
// import AuthContext from "./contexts";
import axios from "axios";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import {
    ResponsiveAppBar,
    SignIn,
    SignUp,
    ForgetPassword,
    ResetPassword,
    LostReport,
    LostPublish,
    MainPage,
    LostReturn,
    PersonalPage,
    ChatroomContainer,
    YourLostItems,
    YourFoundItems,
    APIDocument,
} from "./components";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

// function ProtectedRoute({ children }) {
//   const { user } = React.useContext(AuthContext);
//   // const location = useLocation();

//   return user ? (
//     children
//   ) : (
//     // <Navigate to="/" replace state={{ path: location.pathname }} />
//     <SignIn pageColor="primary" />
//   );
// }

const ProtectedRoute = ({ user, children }) => {

    // const { user } = React.useContext(AuthContext);
    // const location = useLocation();

    if (!user) {
        // setTimeout(function () {}, 5000);
        return <Navigate to="/" replace />;
    }
    return children;
};

function GuestRoute({ user, children }) {
    // const { user } = React.useContext(AuthContext);
    // const location = useLocation();
    if (user) {
        return <Navigate to="mainpage" replace />;
        // return <MainPage />;
    }
    // setTimeout(function () { }, 5000);
    return children;
    // return user ? <MainPage /> : children;
}

export default function App() {
    const [user, setUser] = useState(null);
    const [gettingUser, isGettingUser] = useState(true);

    useEffect(() => {
        if (getAuthToken()) {
            verifyAccount().then((response) => {
                if (response.token != null) {
                    setUser(response.token);
                    isGettingUser(false);
                }
            });
        } else {
            isGettingUser(false);
        }
    }, []);

    // console.log(window.location.href);

    return (
        <Router>
            {user && <ResponsiveAppBar />}
            {!gettingUser ? (
                <Routes>
                    {/* 未登入的頁面 */}
                    <Route
                        path="/"
                        element={
                            <GuestRoute user={user}>
                                <SignIn pageColor="primary" />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/signUp"
                        element={
                            <GuestRoute user={user}>
                                <SignUp pageColor="primary" />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/forgetPassword"
                        element={
                            <GuestRoute user={user}>
                                <ForgetPassword pageColor="primary" />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/resetPassword"
                        element={
                            // <GuestRoute user={user}>
                            <ResetPassword pageColor="primary" />
                            // </GuestRoute>
                        }
                    />
                    {/* 已登入的頁面 */}
                    <Route
                        path="/mainPage"
                        element={
                            <ProtectedRoute user={user}>
                                <MainPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/lostReport"
                        element={
                            <ProtectedRoute user={user}>
                                <LostReport
                                    title="遺失物申報"
                                    pageColor="primaryLight"
                                    foundOrLoss="loss"
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/lostPublish"
                        element={
                            <ProtectedRoute user={user}>
                                <LostPublish
                                    title="拾獲案件刊登"
                                    pageColor="primaryLight"
                                    foundOrLoss="found"
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/lostReturn"
                        element={
                            <ProtectedRoute user={user}>
                                <LostReturn pageColor="primaryLight" />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/personalPage"
                        element={
                            <ProtectedRoute user={user}>
                                <PersonalPage pageColor="primary" />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/chatroom"
                        element={
                            <ProtectedRoute user={user}>
                                <ChatroomContainer pageColor="primary" />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/yourLostItems"
                        element={
                            <ProtectedRoute user={user}>
                                <YourLostItems pageColor="primary" />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/yourFoundItems"
                        element={
                            <ProtectedRoute user={user}>
                                <YourFoundItems pageColor="primary" />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/APIDocument"
                        element={
                            // <ProtectedRoute user={user}>
                            <APIDocument pageColor="primary" />
                            // </ProtectedRoute>
                        }
                    />
                </Routes>
            ) : (
                <Routes>
                    {/* 未登入的頁面 */}
                    <Route
                        path="/"
                        element={
                            <GuestRoute user={user}>
                                <SignIn pageColor="primary" />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/signUp"
                        element={
                            <GuestRoute user={user}>
                                <SignUp pageColor="primary" />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/forgetPassword"
                        element={
                            <GuestRoute user={user}>
                                <ForgetPassword pageColor="primary" />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/resetPassword"
                        element={
                            // <GuestRoute user={user}>
                            <ResetPassword pageColor="primary" />
                            // </GuestRoute>
                        }
                    />
                    <Route
                        path="/APIDocument"
                        element={
                            // <ProtectedRoute user={user}>
                            <APIDocument pageColor="primary" />
                            // </ProtectedRoute>
                        }
                    />
                </Routes>
            )}
        </Router>
    );
}
