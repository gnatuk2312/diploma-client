"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import { Drawer } from "./components";
import { useDrawer, useNavLinks } from "./hooks";
import theme from "@/config/mui/theme";
import { useAuth } from "@/config/auth";

const Navigation = () => {
  const { push } = useRouter();
  const { user, logout } = useAuth();

  const navLinks = useNavLinks(user);
  const { drawerOpen, handleDrawer } = useDrawer();

  const handleLogout = () => {
    logout();
    push("/");
  };

  return (
    <AppBar position="static" color="primary" variant="outlined">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href={user ? `/${user.role.toLowerCase()}` : "/"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="h6"
            lineHeight={1}
            color="white"
            sx={{
              textShadow:
                "-1px -1px 0 green, 1px -1px 0 green, -1px 1px 0 green, 1px 1px 0 green",
            }}
          >
            Ukraine <br /> Logistics
          </Typography>
        </Link>
        <ButtonGroup
          variant="contained"
          sx={{
            display: { xs: "none", md: "flex" },
            backgroundColor: theme.palette.secondary.light,
          }}
        >
          {navLinks.map(({ label, href }) => (
            <Button key={label} variant="outlined" component={Link} href={href}>
              {label}
            </Button>
          ))}
          {user && (
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          )}
        </ButtonGroup>
        <IconButton
          color="inherit"
          edge="end"
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={handleDrawer}
        >
          <MenuIcon sx={{ display: "block", color: "white" }} />
        </IconButton>
      </Toolbar>
      <Drawer
        navLinks={navLinks}
        open={drawerOpen}
        onClose={handleDrawer}
        onLogout={handleLogout}
      />
    </AppBar>
  );
};

export default Navigation;
