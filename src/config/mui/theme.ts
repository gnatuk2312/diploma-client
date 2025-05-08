"use client";
import { createTheme } from "@mui/material/styles";
import { green, grey, red, yellow } from "@mui/material/colors";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: green[800],
      light: green[500],
      dark: green[900],
    },
    secondary: grey,
    error: red,
    warning: yellow,
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;
