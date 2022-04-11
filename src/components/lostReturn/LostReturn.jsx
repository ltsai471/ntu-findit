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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../signIn/Copyright';
import themeColor from '../../config';

const theme = createTheme();

class LostReturn extends React.Component {
    constructor(props) {
        super(props);

        this.pageColor = themeColor[this.props.pageColor];

        this.state = {
            id: "",
            phone: "",
            case: "",
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
                            拾獲物歸還
                        </Typography>
                        <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="dense"
                                        required
                                        fullWidth
                                        id="id"
                                        label="遺失主身分證字號"
                                        name="id"
                                        autoFocus
                                        value={this.state.id}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="dense"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="遺失主手機號碼"
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth margin="dense">
                                        <InputLabel>歸還案件</InputLabel>
                                        <Select
                                            id="case"
                                            name="case"
                                            label="歸還案件"
                                            value={this.state.case}
                                            onChange={this.handleChange}
                                        >
                                            <MenuItem value="#01">2022-03-14 20:23 水壺 共同101 水壺</MenuItem>
                                            <MenuItem value="#02">2022-03-12 17:05 手機 總圖 手機(i13)</MenuItem>
                                            <MenuItem value="#03">2022-03-01 22:42 錢包 管二303 黑色錢包</MenuItem>
                                        </Select>
                                    </FormControl>
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
                                            歸還物品照片
                                            <input
                                                id="image"
                                                name="image"
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
                                            確認歸還
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

LostReturn.defaultProps = {
    pageColor: "secondary"
}

export default LostReturn;