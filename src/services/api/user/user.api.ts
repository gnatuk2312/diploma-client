import axios from "@/config/axios/base-instance";

import { UserInterface } from "@/interfaces/models.interface";
import {
  CreateUserArgumentsInterface,
  GetUserByIdArgumentsInterface,
} from "./user.types";

export const getAllUsersRequest = (): Promise<UserInterface[]> => {
  return axios.get("/users");
};

export const getUserByIdRequest = (
  args: GetUserByIdArgumentsInterface
): Promise<UserInterface> => {
  const { params } = args;

  return axios.get(`/users/${params.id}`);
};

export const createUserRequest = (
  args: CreateUserArgumentsInterface
): Promise<UserInterface> => {
  const { body } = args;

  return axios.post("/users", body);
};
