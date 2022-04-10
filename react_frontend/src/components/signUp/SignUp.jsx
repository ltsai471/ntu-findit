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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../signIn/Copyright'
import themeColor from '../../config';


const theme = createTheme();

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.pageColor = themeColor[this.props.pageColor];

        this.state = {
            name: "",
            email: "",
            password: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        for (const [key, value] of Object.entries(this.state)) {
            console.log(key, value);
        }
        event.preventDefault();
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: this.pageColor }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            NTU Lost
                        </Typography>
                        <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="姓名"
                                        autoFocus
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="email"
                                        name="email"
                                        required
                                        fullWidth
                                        id="email"
                                        label="NTU 信箱"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="new-password"
                                        name="password"
                                        required
                                        fullWidth
                                        id="password"
                                        label="密碼"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="password_confirm"
                                        required
                                        fullWidth
                                        id="password_confirm"
                                        label="確認密碼"
                                        type="password"
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                            </Grid>
                            <Button
                                type="submit"
                                size="large"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    backgroundColor: this.pageColor
                                }}
                            >
                                註冊
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        已經有帳號嗎? 快去登入!
                                    </Link>
                                </Grid>
                            </Grid>
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