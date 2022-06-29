import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import Grid from '@mui/material/Grid';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import lostImg from '../../images/lostImg.jpg';
import Copyright from './Copyright'
import { themeColor } from '../../config';
import { login, login_token } from '../../webAPI';
import { setAuthToken, setLoginUser,setLanguage, getLanguage } from "../../utils";
import AuthContext from "../../contexts";
// import { useTranslation, Trans } from 'react-i18next'
import i18n from 'i18next';

const theme = createTheme();

//changeLanguage('en')

class SignIn extends React.Component {
    static contextType = AuthContext;
    
    constructor(props) {
        super(props);
        this.pageColor = themeColor[this.props.pageColor];
        
        const queryParams = new URLSearchParams(window.location.search)
        this.verified = queryParams.get("verified")

        this.state = {
            email: "",
            password: "",
            // token: ""
            language: "zh"
        };


        setAuthToken(null);
        setLoginUser(null);
        setLanguage("zh");
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ChangeLanguage = this.ChangeLanguage.bind(this);
    }

    // 在 Component 被 Render 的時候執行
    componentDidMount() {
        if (this.verified) {
            alert("帳號驗證成功");
            window.location.replace("/");
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        login(this.state.email, this.state.password).then(
            (data) => {
                if (data.msg === true) {
                    login_token(this.state.email, this.state.password).then((data) => {
                        if (data.token == null) {
                            alert('登入失敗');
                            window.location.reload();
                        }
                        setAuthToken(data.token);
                        setLoginUser(this.state.email);
                        setLanguage(this.state.language);
                        window.location.replace("/mainPage");
                    });
                }
                else if (data.msg === false) {
                    alert("密碼錯誤");
                    window.location.reload();
                } else if (data.msg === "沒驗證") {
                    alert("此信箱尚未驗證");
                    window.location.reload();
                }
            }
        ).catch((error) => {
            alert("此信箱尚未註冊");
            window.location.reload();
        });
    };
    
    ChangeLanguage (){
        if (this.state.language == "zh"){
            this.setState({language: 'en'}, () => { 
                i18n.changeLanguage("en");
                setLanguage("zh")
            });
        } else{
            this.setState({language: 'zh'}, () => { 
                i18n.changeLanguage("zh");
                setLanguage("en")
            });
        }

    };
    
    // ChangeLanguage (){
    //     if (getLanguage() == "zh"){
    //         //console.log(getLanguage());
    //         setLanguage("en", () => { 
    //                         i18n.changeLanguage("en");
    //                     });
    //         window.location.reload()
    
    //     } else{
    //         //console.log(language);
    //         setLanguage("zh")
    //         i18n.changeLanguage("zh")
    //         window.location.reload()
    //     }
    //  };

    
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={false}
                        md={8}
                        lg={7}
                        sx={{
                            backgroundImage: `url(${lostImg})`,
                            // backgroundImage: 'url(https://source.unsplash.com/random)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={12} md={4} lg={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: this.pageColor }}>
                                <TravelExploreIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                              NTU Findit
                            </Typography>
                            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    name="email"
                                    label={i18n.t('signin.ntumail')}
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoComplete="email"
                                    autoFocus
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    name="password"
                                    type="password"
                                    label={i18n.t('signin.password')}
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoComplete="current-password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label={i18n.t('signin.rememberme')}
                                />
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 3, mb: 2 }}
                                    style={{
                                        backgroundColor: this.pageColor,
                                    }}
                                >
                                    {i18n.t('signin.login')}
                                    <input
                                        type="submit"
                                        hidden
                                    />
                                </Button>

                                {/* <Button
                                    variant="outlined"
                                    //onClick={() => i18n.changeLanguage("en")}
                                    onClick={this.changeLanguage("zh")}
                                    style={{
                                    ml: "30%",
                                    mr: "30%",
                                    fontWeight: "bold",
                                    borderColor: "red",
                                    color: "red",
                                    textAlign: "center",
                                    }}
                                >
                                    中文
                                </Button> */}
                                {/* <div>
                                    <button onClick={() => i18n.changeLanguage("zh-tw")}>中文</button>
                                    <button onClick={() => i18n.changeLanguage("en")}>English</button>
                                </div> */}
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="/forgetPassword" variant="body2">
                                            {i18n.t('signin.forget')}
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signUp" variant="body2">
                                            {i18n.t('signin.signup')}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <IconButton
                                    variant="outlined"
                                    size="large"
                                    //onClick={() => i18n.changeLanguage("en")}
                                    onClick={this.ChangeLanguage}
                                    style={{
                                        color: "black",
                                    }}
                                >
                                    <GTranslateIcon
                                        fontSize="inherit"
                                    />
                                    {/* {i18n.t('signin.EC')} */}
                                </IconButton>
                                <Copyright sx={{ mt: 5 }} />

                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

SignIn.defaultProps = {
    pageColor: "primary"
}

export default SignIn;