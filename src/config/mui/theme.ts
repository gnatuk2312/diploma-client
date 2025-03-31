"use client";
import { createTheme } from "@mui/material/styles";
import { green, grey, red, yellow } from "@mui/material/colors";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: green,
    secondary: grey,
    error: red,
    warning: yellow,
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;
