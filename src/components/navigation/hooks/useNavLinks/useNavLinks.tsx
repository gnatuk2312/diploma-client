import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WorkIcon from "@mui/icons-material/Work";
import LoginIcon from "@mui/icons-material/Login";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { UserInterface } from "@/interfaces/models.interface";
import { UseNavLinksReturnType } from "./useNavLinks.types";

const useNavLinks = (user: UserInterface | null): UseNavLinksReturnType => {
  if (user === null) {
    return [
      { label: "Логін", href: "/login", Icon: () => <LoginIcon /> },
      { label: "Реєстрація", href: "/register", Icon: () => <AddBoxIcon /> },
    ];
  }

  const userRoleHref = `/${user.role.toLowerCase()}`;

  return [
    {
      label: "Профіль",
      href: userRoleHref + "/profile",
      Icon: () => <AccountBoxIcon />,
    },
    {
      label: "Вакансії",
      href: userRoleHref + "/vacancies",
      Icon: () => <WorkIcon />,
    },
  ];
};

export default useNavLinks;
