import axios from "@/config/axios/base-instance";

import { AuthInterface } from "@/interfaces/auth.interface";
import {
  RefreshTokenArgumentsInterface,
  SignInArgumentsInterface,
  SignUpArgumentsInterface,
} from "./auth.types";

export const signUpRequest = (
  args: SignUpArgumentsInterface
): Promise<AuthInterface> => {
  const { body } = args;

  return axios.post("/auth/sign-up", body);
};

export const signInRequest = (
  args: SignInArgumentsInterface
): Promise<AuthInterface> => {
  const { body } = args;

  return axios.post("/auth/sign-in", body);
};

export const refreshTokenRequest = (
  args: RefreshTokenArgumentsInterface
): Promise<AuthInterface> => {
  const { body } = args;

  return axios.post("/auth/refresh-token", body);
};
