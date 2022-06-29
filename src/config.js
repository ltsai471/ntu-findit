import { createTheme } from '@mui/material/styles';

// Color
export const themeColor = {
    primary: "#403537", //#262626, "#468C65",
    primaryLight: "#A69485", //#BFB4AA, "#A3BFAA"
    secondary: "#C8A591", //"#706E61",
    secondaryLight: "#EDECDF", //"#A6937C",
    default: "#FFFFFF", //"#0D0D0D",
};

// Theme Color
export const theme = createTheme({
    palette: {
        primary: {
            main: themeColor.primary,
            light: themeColor.primaryLight,
        },
        secondary: {
            main: themeColor.secondary,
            light: themeColor.secondaryLight,
        },
    },
});

