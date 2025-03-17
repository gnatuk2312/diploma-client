"use client";
import { createTheme } from "@mui/material/styles";
import { green, grey } from "@mui/material/colors";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: green,
    secondary: grey,
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;
