import React, { useLocation } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "./signIn/Copyright";
import { themeColor } from "../config";

const theme = createTheme();

class APIDocument extends React.Component {
    constructor(props) {
        super(props);

        this.pageColor = themeColor[this.props.pageColor];
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
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
                        <Typography variant="h5" gutterBottom component="div">
                            API 說明頁面
                        </Typography>
                        <Box
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Stack spacing={4}>
                                    <Grid sm={12}>
                                        <Typography variant="h6" gutterBottom component="div"> API URL </Typography>
                                        <Typography> {"新增(POST): http://localhost:8000/ntulost/item/"} </Typography>
                                        <Typography> {"修改(PUT) / 刪除(DELETE) / 查詢(GET): http://localhost:8000/ntulost/item/<int:id>"} </Typography>
                                    </Grid>
                                    <Grid sm={12}>
                                        <Typography variant="h6" gutterBottom component="div"> Request 格式 </Typography>
                                        <Typography> {`{
                                    "foundOrLoss": "loss",
                                    "status": "finding",
                                    "accountId": "nheditch6@globo.com",
                                    "lossDatetime": "2021-11-27T08:05:30+08:00",
                                    "itemPlace": "51 Killdeer Drive",
                                    "preservePlace": "42910 Acker Way",
                                    "itemType": "Romance|Western",
                                    "itemDesc": "Flame of Barbary Coast",
                                    "image": <ImageArray>
                                }
                                `} </Typography>
                                    </Grid>
                                    <Grid sm={12}>
                                        <Typography variant="h6" gutterBottom component="div"> Response 格式 </Typography>
                                        <Typography> {"(成功)(顯示成功的)"} </Typography>
                                        <Typography> {`(失敗)
                                        {
                                            "id": [
                                                "這個 id 在 item 已經存在。"
                                            ],
                                            "img": [
                                                "提交的資料並不是檔案格式，請確認表單的編碼類型。"
                                            ]
                                        }
                                    `} </Typography>
                                    </Grid>
                                </Stack>
                            </Grid>

                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        );
    }
}

export default APIDocument;
