import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WorkIcon from "@mui/icons-material/Work";
import LoginIcon from "@mui/icons-material/Login";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { UserInterface } from "@/interfaces/models.interface";
import { UseNavLinksReturnType } from "./useNavLinks.types";

const useNavLinks = (user: UserInterface | null): UseNavLinksReturnType => {
  if (user === null) {
    return [
      { label: "Login", href: "/login", Icon: () => <LoginIcon /> },
      { label: "Register", href: "/register", Icon: () => <AddBoxIcon /> },
    ];
  }

  const userRoleHref = `/${user.role.toLowerCase()}`;

  return [
    {
      label: "Profile",
      href: userRoleHref + "/profile",
      Icon: () => <AccountBoxIcon />,
    },
    {
      label: "Vacancies",
      href: userRoleHref + "/vacancies",
      Icon: () => <WorkIcon />,
    },
  ];
};

export default useNavLinks;
