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
// import axios, { post } from 'axios';

const theme = createTheme();

class LostDeclaration extends React.Component {
    constructor(props) {
        super(props);

        this.pageColor = themeColor[this.props.pageColor];
        this.title = this.props.title

        this.state = {
            time: new Date(),
            location: "",
            category: "",
            description: "",
            image: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
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

    handleTimeChange(dateValue) {
        this.setState({
            time: dateValue
        });
    }

    async handleFileChange(event) {
        const target = event.target;
        const file = target.files[0];
        const name = target.name;
        const arrayBuffer = await this.getArrayBuffer(file);
        this.setState({
            [name]: arrayBuffer
        });
        console.log(this.state.image);
    }

    getArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                resolve(reader.result);
            });
            reader.readAsArrayBuffer(file);
        })
    }


    handleSubmit(event) {
        // event.preventDefault();
        // const url = 'http://localhost:5000/';  // Should be changed to API url
        // const formData = new FormData();
        // for (const [key, value] of Object.entries(this.state)) {
        //     console.log(key, value);
        //     formData.append(key, value);
        // }
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     },
        // }
        // axios.post(url, formData, config)
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        // http://localhost:5000
        return fetch('http://localhost:8000/ntulost/item/', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                foundOrLoss: "loss",
                status: "U",
                accountId: "abc@temp.com",
                lossDatetime: this.state.time,
                itemPlace: this.state.location,
                preservePlace: this.state.location,
                itemType: this.state.category,
                itemDesc: this.state.description,
                image: Array.from(new Uint8Array(this.state.image)),
            }),
        }).then((res) => {
            console.log(res);
        })
            .catch(err => console.log('err', err))
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
                            {this.title}
                        </Typography>
                        <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="時間 *"
                                            name="time"
                                            value={this.state.time}
                                            onChange={this.handleTimeChange}
                                            required
                                        />
                                    </LocalizationProvider>
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
                                            name="image"
                                            onChange={this.handleFileChange}
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
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        id="outlined-multiline-static"
                                        label="物品描述"
                                        multiline
                                        fullWidth
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            fullWidth
                                            size="large"
                                            style={{
                                                backgroundColor: this.pageColor,
                                            }}
                                        >
                                            送出
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

LostDeclaration.defaultProps = {
    title: "遺失物申報",
    pageColor: "secondary"
}

export default LostDeclaration;