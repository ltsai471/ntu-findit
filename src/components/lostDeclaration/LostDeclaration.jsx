import React, { useLocation } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Copyright from "../signIn/Copyright";
import themeColor from "../../config";
import { createItem } from "../../webAPI";
import { getLoginUser , getLanguage} from "../../utils";
// import axios, { post } from 'axios';
import i18n from 'i18next';

const theme = createTheme();
// const changeLanguage= (val) => {
//   i18n.changeLanguage(val); 
// };
// i18n.changeLanguage("en")
class LostDeclaration extends React.Component {
  constructor(props) {
    super(props);

    this.pageColor = themeColor[this.props.pageColor];
    this.title = this.props.title;
    this.foundOrLoss = this.props.foundOrLoss;

    const queryParams = new URLSearchParams(window.location.search);
    this.lat = queryParams.get("lat");
    this.lng = queryParams.get("lng");

    this.email = getLoginUser();

    this.state = {
      time: new Date(),
      location: "",
      category: "",
      description: "",
      image: null,
      imgFilename: "照片上傳",
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
      this.state.imgFilename
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

  // body: JSON.stringify({
  //     foundOrLoss: this.foundOrLoss,
  //     status: "finding",
  //     accountId: "1",
  //     lossDatetime: this.state.time,
  //     itemPlace: this.state.location,
  //     // preservePlace: "xx保管處4",
  //     itemType: this.state.category,
  //     itemDesc: this.state.description,
  //     image: Array.from(new Uint8Array(this.state.image)),
  //     imgFilename: this.state.imgFilename
  // }),
  // }).then((res) => {
  //     console.log(res.status);
  //     if (res.status == 201) {
  //         this.foundOrLoss == "loss" ? alert("申報成功") : alert("刊登成功");
  //         window.location.replace("/mainPage");
  //     } else {
  //         this.foundOrLoss == "loss" ? alert("申報失敗") : alert("刊登失敗");
  //     }
  // })
  //         .catch (err => console.log('err', err))
  // }


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
              {i18n.t('LostDeclaration.title2')}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={this.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label={i18n.t('LostDeclaration.time')}
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
                    style={{
                      minHeight: "55px",
                      backgroundColor: this.pageColor,
                    }}
                  >
                    {i18n.t('LostDeclaration.upload')}
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
                    <InputLabel>{i18n.t('LostDeclaration.location')}</InputLabel>
                    <Select
                      name="location"
                      label={i18n.t('LostDeclaration.location')}
                      value={this.state.location}
                      onChange={this.handleChange}
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
                      <MenuItem value="1">{i18n.t('LostDeclaration.credentials')}</MenuItem>
                      <MenuItem value="2">{i18n.t('LostDeclaration.book')}</MenuItem>
                      <MenuItem value="3">{i18n.t('LostDeclaration.3C')}</MenuItem>
                      <MenuItem value="4">{i18n.t('LostDeclaration.valuables')}</MenuItem>
                      <MenuItem value="5">{i18n.t('LostDeclaration.clothes')}</MenuItem>
                      <MenuItem value="6">{i18n.t('LostDeclaration.stationery')}</MenuItem>
                      <MenuItem value="7">{i18n.t('LostDeclaration.Others')}</MenuItem>
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

LostDeclaration.defaultProps = {
  title: "遺失物申報",
  pageColor: "secondary",
};

export default LostDeclaration;
