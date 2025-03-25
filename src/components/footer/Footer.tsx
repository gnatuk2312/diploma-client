import { FC } from "react";
import { Box, Typography } from "@mui/material";

const Footer: FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "secondary.light",
        padding: 1,
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} — Hnat Liashenko
      </Typography>
    </Box>
  );
};

export default Footer;
