import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import LockResetIcon from '@mui/icons-material/LockReset';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../signIn/Copyright'
import { themeColor } from '../../config';
import { resetPwd } from '../../webAPI';
import i18n from 'i18next';

// const changeLanguage= (val) => {
//   i18n.changeLanguage(val); 
// };
// changeLanguage('en')

const theme = createTheme();

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.pageColor = themeColor[this.props.pageColor];

        const queryParams = new URLSearchParams(window.location.search);
        this.arg = queryParams.get("arg");

        this.state = {
            password: "",
            confirmPassword: "",
            passwordError: "",
            confirmPasswordError: "",
            language: "zh"
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
            [name + "Error"]: ""
        });
        switch (name) {
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
        if (!this.arg || !this.state.password || (this.state.password !== this.state.confirmPassword)) {
            alert("密碼重設失敗，請確認表單內容");
            return
        }
        resetPwd(this.arg, this.state.password).then(
            (data) => {
                if (data.msg === "Success") {
                    alert("密碼重設成功");
                    window.location.replace("/");
                } else {
                    alert("憑證到期，已重新寄發驗證信件");
                    window.location.replace("/");
                }
            }).catch((error) => {
                alert("密碼重設失敗");
                window.location.reload();
            });
    }

    ChangeLanguage() {

        if (this.state.language == "zh") {
            this.setState({ language: 'en' }, () => {
                i18n.changeLanguage("en");
            });
        } else {
            this.setState({ language: 'zh' }, () => {
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
                            marginTop: "30%",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: this.pageColor }}>
                            <LockResetIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {i18n.t('resetpwd.reset')}
                        </Typography>
                        <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Stack sx={{ width: '100%' }} spacing={1}>
                                        <TextField
                                            type="password"
                                            name="password"
                                            label={i18n.t('resetpwd.pwd')}
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
                                            label={i18n.t('resetpwd.confirm')}
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
                                        {i18n.t('resetpwd.submit')}
                                        <input
                                            type="submit"
                                            hidden
                                        />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
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
                </Container>
            </ThemeProvider>
        );
    }
}

ResetPassword.defaultProps = {
    pageColor: "primary"
}

export default ResetPassword;