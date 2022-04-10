import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../signIn/Copyright';
import themeColor from '../../config';

const theme = createTheme();

class PersonalPage extends React.Component {
    constructor(props) {
        super(props);

        this.pageColor = themeColor[this.props.pageColor];

        this.state = {
            name: "王小明",
            email: "r10725000@ntu.edu.tw",
            image: "",
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
                        <Avatar sx={{ m: 1, bgcolor: this.pageColor }} variant="rounded">
                            <AssignmentIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            個人資料修改
                        </Typography>
                        <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="dense"
                                        required
                                        fullWidth
                                        id="name"
                                        label="使用者名稱"
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
                                        label="NTU 信箱"
                                        name="email"
                                        autoComplete="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth margin="dense">
                                        <Button
                                            variant="contained"
                                            component="label"
                                            fullWidth
                                            startIcon={<PhotoCamera />}
                                            size="large"
                                            style={{ backgroundColor: this.pageColor }}
                                        >
                                            大頭貼上傳
                                            <input
                                                type="file"
                                                value={this.state.image}
                                                onChange={this.handleChange}
                                                hidden
                                            />
                                        </Button>
                                    </FormControl>
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
                                            送出修改
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