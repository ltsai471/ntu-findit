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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../signIn/Copyright'
import { themeColor } from '../../config';
import { sendResetPwdMail } from '../../webAPI';
import i18n from 'i18next';
import { getLanguage } from '../../utils';

// const changeLanguage= (val) => {
//   i18n.changeLanguage(val); 
// };
// changeLanguage('en')

const theme = createTheme();
class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.pageColor = themeColor[this.props.pageColor];

        this.state = {
            email: "",
            emailError: "",
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
            [name + "Error"]: ""
        });
        if (!value) {
            this.setState({ emailError: "請輸入電子信箱" });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.email) {
            alert("請填寫信箱");
            return
        }
        sendResetPwdMail(this.state.email).then(
            (data) => {
                alert("已寄出重設密碼信函至該信箱");
                window.location.replace("/");
            }).catch((error) => {
                alert("此帳號不存在");
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
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            NTU Findit
                        </Typography>
                        <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Stack sx={{ width: '100%' }} spacing={1}>
                                        <TextField
                                            autoComplete="email"
                                            name="email"
                                            required
                                            fullWidth
                                            id="email"
                                            label={i18n.t('signin.ntumail')}
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            onBlur={this.handleValidate}
                                        />
                                        {this.state.emailError && <Alert severity="error"> {this.state.emailError} </Alert>}
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
                                        {i18n.t('signin.forgetpwd')}
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

ForgetPassword.defaultProps = {
    pageColor: "primary"
}

export default ForgetPassword;