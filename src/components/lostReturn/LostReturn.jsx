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
import { themeColor } from '../../config';
import { returnLost } from "../../webAPI";

const theme = createTheme();

class LostReturn extends React.Component {
    constructor(props) {
        super(props);

        this.pageColor = themeColor[this.props.pageColor];

        const queryParams = new URLSearchParams(window.location.search);
        this.itemId = queryParams.get("id");
        this.lossDatetime = queryParams.get("lossDatetime");
        this.itemPlace = queryParams.get("itemPlace");
        this.itemType = queryParams.get("itemType");

        this.state = {
            ownerId: "",
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
        event.preventDefault();
        returnLost(this.state.ownerId, this.itemId).then((data) => {
            if (data.id == this.itemId) {
                alert("歸還成功");
                window.location.replace("/yourfounditems");
            } else {
                alert("歸還失敗");
            }
        }).catch((error) => {
            alert("歸還失敗");
        });
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
                                        id="ownerId"
                                        label="遺失主學號"
                                        name="ownerId"
                                        autoFocus
                                        value={this.state.ownerId}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth margin="dense">
                                        <InputLabel>歸還案件</InputLabel>
                                        <Select
                                            id="itemId"
                                            name="itemId"
                                            label="歸還案件"
                                            value={this.itemId}
                                            // inputProps={{ readOnly: true }}
                                            disabled
                                        >
                                            <MenuItem selected value={this.itemId}> {this.lossDatetime} {this.itemPlace} {this.itemType} </MenuItem>
                                        </Select>
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