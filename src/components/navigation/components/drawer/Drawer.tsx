import { FC } from "react";
import Link from "next/link";
import {
  Drawer as MuiDrawer,
  Box,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { NavLinkInterface } from "../../navigation.types";
import { useAuth } from "@/config/auth";

type Props = {
  navLinks: NavLinkInterface[];
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const Drawer: FC<Props> = (props) => {
  const { navLinks, open, onClose, onLogout } = props;

  const { user } = useAuth();

  return (
    <MuiDrawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 250 }}>
        <List component="nav">
          {navLinks.map(({ label, href, Icon }) => (
            <ListItemButton
              key={label}
              component={Link}
              href={href}
              onClick={onClose}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
          {user && (
            <ListItemButton onClick={onLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          )}
        </List>
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
