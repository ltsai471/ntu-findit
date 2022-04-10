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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Copyright from '../signIn/Copyright';
import themeColor from '../../config';

const theme = createTheme();

class LostReturn extends React.Component {
    constructor(props) {
        super(props);

        this.pageColor = themeColor[this.props.pageColor];

        this.state = {
            time: new Date(),
            location: "",
            category: "",
            description: "",
            image: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleTimeChange(dateValue) {
        this.setState({
            time: dateValue
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
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="NTU 信箱"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        fullWidth
                                        startIcon={<PhotoCamera />}
                                        style={{ minHeight: '55px', backgroundColor: this.pageColor }}
                                    >
                                        照片上傳
                                        <input
                                            type="file"
                                            value={this.state.image}
                                            onChange={this.handleChange}
                                            hidden
                                        />
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>地點</InputLabel>
                                        <Select
                                            name="location"
                                            label="地點"
                                            value={this.state.location}
                                            onChange={this.handleChange}
                                        >
                                            <MenuItem value="總圖">總圖</MenuItem>
                                            <MenuItem value="管理學院">管理學院</MenuItem>
                                            <MenuItem value="社會科學院">社會科學院</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>物品分類 *</InputLabel>
                                        <Select
                                            name="category"
                                            label="物品分類 *"
                                            value={this.state.category}
                                            onChange={this.handleChange}
                                            required
                                        >
                                            <MenuItem value="手機">手機</MenuItem>
                                            <MenuItem value="錢包">錢包</MenuItem>
                                            <MenuItem value="其他">其他</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="description"
                                        onChange={this.handleChange}
                                        id="outlined-multiline-static"
                                        label="物品描述"
                                        multiline
                                        fullWidth
                                        rows={4}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                size="large"
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    backgroundColor: this.pageColor
                                }}
                            >
                                送出
                            </Button>
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