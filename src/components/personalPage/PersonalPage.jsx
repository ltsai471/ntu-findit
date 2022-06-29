import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LockResetIcon from '@mui/icons-material/LockReset';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import { ThemeProvider } from "@mui/material/styles";
import Copyright from '../signIn/Copyright';
import { themeColor, theme } from "../../config";
import { getUserInfo, modifyUserInfo } from "../../webAPI";
import { getLoginUser } from "../../utils";
import i18n from 'i18next';

// const changeLanguage= (val) => {
//   i18n.changeLanguage(val); 
// };
// changeLanguage('en')

//const theme = createTheme();
import { sendResetPwdMail } from '../../webAPI';

class PersonalPage extends React.Component {
    constructor(props) {
        super(props);

        this.pageColor = themeColor[this.props.pageColor];

        this.email = getLoginUser();

        this.state = {
            name: "",
            image: null,
            imgFilename: null, // "大頭貼上傳"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
    }

    // 在 Component 被 Render 的時候執行
    componentDidMount() {
        getUserInfo(this.email).then((data) => {
            this.setState({
                name: data.name,
                // image: data.photo
            });
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleFileChange(event) {
        const target = event.target;
        const file = target.files[0];
        const fileName = file.name;
        const name = target.name;
        const arrayBuffer = await this.getArrayBuffer(file);
        this.setState({
            [name]: arrayBuffer,
            ["imgFilename"]: fileName,
        });
    }

    getArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                resolve(reader.result);
            });
            reader.readAsArrayBuffer(file);
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        var finalImage = !this.state.image ? "" : Array.from(new Uint8Array(this.state.image));
        modifyUserInfo(this.email, finalImage, this.state.name, this.state.imgFilename).then(
            (data) => {
                alert("資料修改成功");
                window.location.reload();
            }
        ).catch((error) => {
            alert("資料修改失敗");
            window.location.reload();
        });
    }

    handleResetPassword() {
        var check = window.confirm('是否確認寄送重設密碼信函至用戶信箱？');
        if (check) {
            sendResetPwdMail(this.email).then(
                (data) => {
                    alert("已寄出重設密碼信函至該信箱");
                }).catch((error) => {
                    alert("寄送失敗");
                });
        }
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
                        <Avatar sx={{ m: 1, bgcolor: this.pageColor }} variant="rounded">
                            <AssignmentIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {i18n.t('personal.modify')}
                        </Typography>
                        <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="dense"
                                        required
                                        fullWidth
                                        id="name"
                                        label={i18n.t('personal.user_name')}
                                        name="name"
                                        autoFocus
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="dense"
                                        required
                                        fullWidth
                                        id="email"
                                        label={i18n.t('personal.mail')}
                                        name="email"
                                        autoComplete="email"
                                        // inputProps={{ readOnly: true }}
                                        disabled
                                        value={this.email}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        fullWidth
                                        startIcon={<PhotoCamera />}
                                        size="large"
                                        color="primary"
                                    // style={{ backgroundColor: this.pageColor }}
                                    >
                                        {this.state.imgFilename ? 
                                            this.state.imgFilename : i18n.t('personal.photo')}
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={this.handleFileChange}
                                            hidden
                                        />
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        fullWidth
                                        startIcon={<LockResetIcon />}
                                        size="large"
                                        color="primary"
                                        // style={{ backgroundColor: this.pageColor }}
                                        onClick={this.handleResetPassword}
                                    >
                                        {i18n.t('personal.pwd')}
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth margin="dense">
                                        <Button
                                            variant="contained"
                                            component="label"
                                            fullWidth
                                            size="large"
                                            style={{
                                                backgroundColor: this.pageColor,
                                            }}
                                        >
                                            {i18n.t('personal.submit')}
                                            <input
                                                type="submit"
                                                hidden
                                            />
                                        </Button>
                                    </FormControl>
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

PersonalPage.defaultProps = {
    pageColor: "primary"
}

export default PersonalPage;