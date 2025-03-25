import { AuthInterface } from "@/interfaces/auth.interface";
import { UserInterface } from "@/interfaces/models.interface";

export interface AuthContextInterface {
  user: UserInterface | null;
  setAuth: (auth: AuthInterface) => void;
  logout: () => void;
}
