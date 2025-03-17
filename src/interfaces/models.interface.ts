import { UserRole } from "@/enums/user.enum";

export interface UserInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  role: UserRole;
}
