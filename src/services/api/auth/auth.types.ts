import { UserRole } from "@/enums/user.enum";

export interface SignUpArgumentsInterface {
  body: {
    username: string;
    password: string;
    role: UserRole;
  };
}

export interface SignInArgumentsInterface {
  body: {
    username: string;
    password: string;
  };
}

export interface RefreshTokenArgumentsInterface {
  body: {
    refreshToken: string;
  };
}
