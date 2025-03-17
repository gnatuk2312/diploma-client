import baseAxiosInstance from "@/config/axios/base-instance";
import { UserInterface } from "@/interfaces/models.interface";

export const getAllUsersRequest = (): Promise<UserInterface[]> => {
  return baseAxiosInstance.get("/users");
};
