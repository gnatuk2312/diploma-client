import { UserInterface } from "./models.interface";

export interface AuthInterface {
  accessToken: string;
  refreshToken: string;
  user: UserInterface;
}
