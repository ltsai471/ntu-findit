import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from "@mui/material/IconButton";
import AssignmentIcon from '@mui/icons-material/Assignment';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../signIn/Copyright'
import { themeColor } from '../../config';
import { signup } from '../../webAPI';
import i18n from 'i18next';
import { getLanguage } from '../../utils';

// const changeLanguage= (val) => {
//   i18n.changeLanguage(val); 
// };
// changeLanguage('en')

const theme = createTheme();

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.pageColor = themeColor[this.props.pageColor];

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            nameError: "",
            emailError: "",
            passwordError: "",
            confirmPasswordError: "",
            language: getLanguage()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.ChangeLanguage = this.ChangeLanguage.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        this.handleValidate(event);
    }

    handleValidate(event) {
        let { name, value } = event.target;
        this.setState({
            [name+"Error"]: ""
        });
        switch (name) {
            case "name":
                if (!value) {
                    this.setState({ nameError: "請輸入姓名" });
                }
                break;

            case "email":
                if (!value) {
                    this.setState({ emailError: "請輸入電子信箱" });
                }
                break;

            case "password":
                if (!value) {
                    this.setState({ passwordError: "請輸入密碼" });
                } else if (this.state.confirmPassword && value !== this.state.confirmPassword) {
                    this.setState({ confirmPasswordError: "兩次輸入的密碼不同" });
                } else {
                    if (this.state.confirmPassword) {
                        this.setState({ confirmPasswordError: "" });
                    }
                }
                break;

            case "confirmPassword":
                if (!value) {
                    this.setState({ confirmPasswordError: "請再次輸入密碼" });
                } else if (this.state.password && value !== this.state.password) {
                    this.setState({ confirmPasswordError: "兩次輸入的密碼不同" });
                }
                break;

            default:
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.name || !this.state.email || !this.state.password || this.state.password !== this.state.confirmPassword) {
            alert("註冊失敗，請確認表單內容");
            return
        }
        signup(this.state.name, this.state.email, this.state.password).then(
            (data) => {
                if (data.msg === "Success") {
                    alert("註冊成功，請檢查驗證郵件");
                    window.location.reload();
                } else if (data.msg === "帳號已註冊") {
                    alert("此帳號已存在");
                    window.location.reload();
                } else if (data.msg === "不是ntumail") {
                    alert("此帳號並非台大信箱，請改用台大信箱註冊");
                    // window.location.reload();
                }
            }
        );


    }

    ChangeLanguage (){
        
        if (this.state.language == "zh"){
            this.setState({language: 'en'}, () => { 
                i18n.changeLanguage("en");
            });
        } else{
            this.setState({language: 'zh'}, () => { 
                i18n.changeLanguage("zh");
            });
        }

    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: "20%",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: this.pageColor }}>
                            <AssignmentIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            NTU Findit
                        </Typography>
                        <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Stack sx={{ width: '100%' }} spacing={1}>
                                        <TextField
                                            name="name"
                                            label={i18n.t('signup.name')}
                                            autoComplete="given-name"
                                            required
                                            fullWidth
                                            autoFocus
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                            onBlur={this.handleValidate}
                                        />
                                        {this.state.nameError && <Alert severity="error"> {this.state.nameError} </Alert>}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack sx={{ width: '100%' }} spacing={1}>
                                        <TextField
                                            name="email"
                                            label={i18n.t('signup.mail')}
                                            autoComplete="email"
                                            required
                                            fullWidth
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            onBlur={this.handleValidate}
                                        />
                                        {this.state.emailError && <Alert severity="error"> {this.state.emailError} </Alert>}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack sx={{ width: '100%' }} spacing={1}>
                                        <TextField
                                            type="password"
                                            name="password"
                                            label={i18n.t('signup.pwd')}
                                            required
                                            fullWidth
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            onBlur={this.handleValidate}
                                        />
                                        {this.state.passwordError && <Alert severity="error"> {this.state.passwordError} </Alert>}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack sx={{ width: '100%' }} spacing={1}>
                                        <TextField
                                            type="password"
                                            name="confirmPassword"
                                            label={i18n.t('signup.confirm')}
                                            required
                                            fullWidth
                                            value={this.state.confirmPassword}
                                            onChange={this.handleChange}
                                            onBlur={this.handleValidate}
                                        />
                                        {this.state.confirmPasswordError && <Alert severity="error"> {this.state.confirmPasswordError} </Alert>}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        fullWidth
                                        size="large"
                                        style={{
                                            backgroundColor: this.pageColor,
                                        }}
                                    >
                                        {i18n.t('signup.signup')}
                                        <input
                                            type="submit"
                                            hidden
                                        />
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        {i18n.t('signup.login')}
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

                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        );
    }
}

SignUp.defaultProps = {
    pageColor: "primary"
}

export default SignUp;