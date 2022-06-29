import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { themeColor } from "../config.js";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import GTranslateIcon from '@mui/icons-material/GTranslate';
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { getAuthToken, getLoginUser, logout, setLanguage, getLanguage } from "../utils";
import { getUserInfo } from "../webAPI";
import i18n from 'i18next';


var pages = ["聊天室", "刊登拾獲案件", "申報遺失物", "我的遺失物", "我的拾獲案件"];
var settings = ["個人資料", "Logout"];
var pageRoutes = {
    聊天室: "/chatroom",
    刊登拾獲案件: "/lostPublish",
    申報遺失物: "/lostReport",
    我的遺失物: "/YourLostItems",
    我的拾獲案件: "/YourFoundItems",
    個人資料: "/personalPage",
    Login: "/",
    Logout: "/logout",
};
if (getLanguage() == 'en') {
    pages = ["chatroom", "Post_Items_Found", "Report_Lost_Items", "My_Lost_Items", "My_Found_Items"];
    settings = ["personal_information", "Logout"];
    pageRoutes = {
        chatroom: "/chatroom",
        Post_Items_Found: "/lostPublish",
        Report_Lost_Items: "/lostReport",
        My_Lost_Items: "/YourLostItems",
        My_Found_Items: "/YourFoundItems",
        personal_information: "/personalPage",
        Login: "/",
        Logout: "/logout",
    }
};

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [username, setUsername] = useState("");
    //const [language, setLanguage] = useState("");
    const [photoUrl, setPhotoUrl] = useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const onClickRedirect = (path) => {
        if (path === "/logout") {
            logout();
            window.location.replace("/");
        } else {
            navigate(path);
            setAnchorElNav(null);
        }
    };
    const ChangeLanguage = () => {
        if (getLanguage() == "zh") {
            //console.log(getLanguage());
            setLanguage("en");
            i18n.changeLanguage("en");
            window.location.reload();

        } else {
            //console.log(language);
            setLanguage("zh");
            i18n.changeLanguage("zh");
            window.location.reload();
        }
    };
    const handleCloseUserMenu = () => setAnchorElUser(null);
    const handleCloseNavMenu = () => setAnchorElNav(null);

    const AppBarStyle = { backgroundColor: themeColor.primary };
    useEffect(() => {
        if (getAuthToken() != null && getLoginUser() != null) {
            getUserInfo(getLoginUser()).then((response) => {
                setUsername(response.name);
                const content = new Uint8Array(response.photo);
                setPhotoUrl(URL.createObjectURL(
                    new Blob([content.buffer], { type: 'image/' + response.fileExtension })
                ));
            });
        }
    }, []);

    //   ChangeLanguage (()=>{     
    //     if (this.state.language == "zh"){
    //         this.setState({language: 'en'}, () => { 
    //             i18n.changeLanguage("en");
    //         });
    //     } else{
    //         this.setState({language: 'zh'}, () => { 
    //             i18n.changeLanguage("zh");
    //         });
    //     }

    // });
    i18n.changeLanguage(getLanguage())
    return (
        <AppBar position="static" sx={AppBarStyle}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MenuItem key="LOGO" onClick={() => onClickRedirect("/mainpage")}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                        >
                            NTU Findit
                        </Typography>
                    </MenuItem>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => onClickRedirect(pageRoutes[page])}
                                >
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    >
                        NTU Findit
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => onClickRedirect(pageRoutes[page])}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            variant="outlined"
                            size="large"
                            //onClick={() => i18n.changeLanguage("en")}
                            onClick={ChangeLanguage}
                            style={{
                                color: "white",
                            }}
                        >
                            <GTranslateIcon
                                fontSize="inherit"
                            />
                            {/* {i18n.t('signin.EC')} */}
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Typography
                            variant="body"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                        >
                            {username}
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={photoUrl} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={() => onClickRedirect(pageRoutes[setting])}
                                //   onClick={() => window.location.replace("/")}
                                >
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
