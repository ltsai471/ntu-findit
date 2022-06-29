import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from '@mui/material/FormHelperText';
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Copyright from "../signIn/Copyright";
import { themeColor, theme } from "../../config";
import { createItem, objectRecognition, closestItemPlace } from "../../webAPI";
import { getLoginUser } from "../../utils";
import i18n from 'i18next';


class LostReport extends React.Component {
    constructor(props) {
        super(props);

        this.pageColor = themeColor[this.props.pageColor];
        this.title = this.props.title;
        this.foundOrLoss = this.props.foundOrLoss;

        const queryParams = new URLSearchParams(window.location.search);
        this.lat = queryParams.get("lat") ? queryParams.get("lat") : "";
        this.lng = queryParams.get("lng") ? queryParams.get("lng") : "";

        this.email = getLoginUser();

        this.state = {
            time: new Date(),
            location: "",
            category: "",
            description: "",
            image: null,
            imgFilename: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleObjectRecognition = this.handleObjectRecognition.bind(this);
        this.handleStudentCardRecognition = this.handleStudentCardRecognition.bind(this);
    }

    // 在 Component 被 Render 的時候執行
    componentDidMount() {
        if (this.lat && this.lng) {
            closestItemPlace(Number(this.lat), Number(this.lng)).then(
                (data) => {
                    if (data.itemPlace) {
                        this.setState({
                            location: "" + data.itemPlace,
                        });
                    } else {
                        alert("無法取得經緯度之對應地點");
                    }
                }).catch((error) => {
                    alert("無法取得經緯度之對應地點");
                });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }

    handleTimeChange(dateValue) {
        this.setState({
            time: dateValue,
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
        createItem(
            this.foundOrLoss,
            "finding",
            this.email,
            this.state.time,
            Number(this.state.location),
            Number(this.state.category),
            this.state.description,
            Array.from(new Uint8Array(this.state.image)),
            this.state.imgFilename,
            this.lat,
            this.lng
        )
            .then((data) => {
                if (data.id) {
                    if (this.foundOrLoss == "loss") {
                        alert("申報成功");
                        window.location.replace("/yourlostitems");
                    } else {
                        alert("刊登成功");
                        window.location.replace("/yourfounditems");
                    }
                } else {
                    this.foundOrLoss == "loss" ? alert("申報失敗") : alert("刊登失敗");
                    // window.location.reload();
                }
            })
            .catch((error) => {
                this.foundOrLoss == "loss" ? alert("申報失敗") : alert("刊登失敗");
                // window.location.reload();
            });
    }

    handleObjectRecognition() {
        objectRecognition(
            0,
            Array.from(new Uint8Array(this.state.image)),
        ).then(
            (data) => {
                var result = data.imgResult;
                if (!result) {
                    alert("辨識失敗");
                } else {
                    alert("辨識完成");
                    this.setState({
                        category: result,
                    });
                }
            }).catch((error) => {
                alert("辨識失敗");
            });
    }

    handleStudentCardRecognition() {
        objectRecognition(
            1,
            Array.from(new Uint8Array(this.state.image)),
        ).then(
            (data) => {
                var result = data.imgResult;
                if (!result) {
                    alert("辨識失敗");
                } else if (result != "0") {
                    if (this.state.description != "") {
                        this.setState({
                            description: this.state.description + "\n學生證學號: " + result,
                        });
                    } else {
                        this.setState({
                            description: "學生證學號: " + result,
                        });
                    }
                    alert("辨識完成, 學生證學號: " + result);
                } else {
                    alert("無法辨識此圖片中之學號資訊");
                }
            }).catch((error) => {
                alert("辨識失敗");
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
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: this.pageColor }} variant="rounded">
                            <AssignmentIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {i18n.t('LostDeclaration.title1')}
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={this.handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={7}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            // fullWidth 要加在 TextField 的參數才有用
                                            renderInput={(props) => <TextField {...props} fullWidth />}
                                            label={i18n.t('LostDeclaration.time')}
                                            name="time"
                                            value={this.state.time}
                                            onChange={this.handleTimeChange}
                                            required
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={5}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        fullWidth
                                        startIcon={<PhotoCamera />}
                                        style={{
                                            minHeight: "55px",
                                            backgroundColor: this.pageColor,
                                        }}
                                    >
                                        {this.state.imgFilename ?
                                            this.state.imgFilename : i18n.t('LostDeclaration.upload')}
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={this.handleFileChange}
                                            hidden
                                        />
                                    </Button>
                                </Grid>
                                {/* {this.state.image && (
                                    <Grid item xs={6}>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            fullWidth
                                            size="large"
                                            color="primary"
                                            startIcon={<ImageSearchIcon />}
                                            onClick={this.handleObjectRecognition}>
                                            {i18n.t('LostDeclaration.obr')}
                                        </Button>
                                    </Grid>)
                                } */}
                                {this.state.image && (
                                    <Grid item xs={12}>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            fullWidth
                                            size="large"
                                            color="primary"
                                            startIcon={<ImageSearchIcon />}
                                            onClick={this.handleStudentCardRecognition}>
                                            {i18n.t('LostDeclaration.student')}
                                        </Button>
                                    </Grid>)
                                }
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>{i18n.t('LostDeclaration.location')}</InputLabel>
                                        <Select
                                            name="location"
                                            label={i18n.t('LostDeclaration.location')}
                                            value={this.state.location}
                                            onChange={this.handleChange}
                                            // inputProps={{ readOnly: this.lat && this.lng }}
                                            disabled={this.lat && this.lng ? true : false}
                                            required
                                        >
                                            <MenuItem value="1">{i18n.t('location.Zhoushan_Road')}</MenuItem>
                                            <MenuItem value="2">{i18n.t('location.Building1_management')}</MenuItem>
                                            <MenuItem value="3">{i18n.t('location.Building2_management')}</MenuItem>
                                            <MenuItem value="4">{i18n.t('location.tandr_management')}</MenuItem>
                                            <MenuItem value="5">{i18n.t('location.library')}</MenuItem>
                                            <MenuItem value="6">{i18n.t('location.activity1')}</MenuItem>
                                            <MenuItem value="7">{i18n.t('location.activity2')}</MenuItem>
                                            <MenuItem value="8">
                                                {i18n.t('location.civil_eng')}
                                            </MenuItem>
                                            <MenuItem value="9">{i18n.t('location.boya')}</MenuItem>
                                        </Select>
                                        {this.lat && this.lng && <FormHelperText> Latitude: {this.lat} <br></br> Longitude: {this.lng} </FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>{i18n.t('LostDeclaration.item_catogary')}</InputLabel>
                                        <Select
                                            name="category"
                                            label={i18n.t('LostDeclaration.item_catogary')}
                                            value={this.state.category}
                                            onChange={this.handleChange}
                                            required
                                        >
                                            <MenuItem value="1">{i18n.t('LostDeclaration.sid')}</MenuItem>
                                            <MenuItem value="2">{i18n.t('LostDeclaration.nid')}</MenuItem>
                                            <MenuItem value="3">{i18n.t('LostDeclaration.hid')}</MenuItem>
                                            <MenuItem value="6">{i18n.t('LostDeclaration.cell')}</MenuItem>
                                            <MenuItem value="7">{i18n.t('LostDeclaration.NB')}</MenuItem>
                                            <MenuItem value="10">{i18n.t('LostDeclaration.key')}</MenuItem>
                                            <MenuItem value="11">{i18n.t('LostDeclaration.wallet')}</MenuItem>
                                            <MenuItem value="4">{i18n.t('LostDeclaration.book')}</MenuItem>
                                            <MenuItem value="12">{i18n.t('LostDeclaration.shoes')}</MenuItem>
                                            <MenuItem value="13">{i18n.t('LostDeclaration.hat')}</MenuItem>
                                            <MenuItem value="14">{i18n.t('LostDeclaration.clothes')}</MenuItem>
                                            <MenuItem value="15">{i18n.t('LostDeclaration.bp')}</MenuItem>
                                            <MenuItem value="19">{i18n.t('LostDeclaration.wb')}</MenuItem>
                                            <MenuItem value="28">{i18n.t('LostDeclaration.um')}</MenuItem>
                                            <MenuItem value="27">{i18n.t('LostDeclaration.Others')}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        id="outlined-multiline-static"
                                        label={i18n.t('LostDeclaration.Object_description')}
                                        multiline
                                        fullWidth
                                        rows={4}
                                        required
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
                                            {i18n.t('LostDeclaration.submit')}
                                            <input type="submit" hidden />
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

LostReport.defaultProps = {
    title: "遺失物申報",
    pageColor: "secondary",
};

export default LostReport;
