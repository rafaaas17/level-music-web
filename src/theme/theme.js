import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#964901" : "#EF7E1B",
        hover: mode === "dark" ? "#703501" : "#CF6D17",
      },
      secondary: {
        main: "#E6BB93",
      },
      error: {
        main: red.A400,
      },
      background: {
        default: mode === "dark" ? "#44444E" : "#FFFFFF",
      },
      text: {
        primary: mode === "dark" ? "#FFFBFF" : "#252020",
        secondary: mode === "dark" ? "#ffffff" : "#666666",
      },
      social_media: {
        text: mode === "dark" ? "#C0B9B3" : "#666666",
        divider: mode === "dark" ? "#5D493B" : "#C4C4C4",
      },
      paper: {
        main: mode === "dark" ? "#1D1D1D" : "#000"
      },
      footer: {
        main: mode === 'dark' ? "#1D1D1D" : "#333333"
      }      
    },
    typography: {
      fontFamily: "'Mulish', sans-serif",
    }
  }
);