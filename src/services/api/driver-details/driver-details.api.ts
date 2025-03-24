import axios from "@/config/axios/base-instance";

import {
  CreateDriverDetailsArgumentsInterface,
  GetDriverDetailsByUserIdArgumentsInterface,
  UpdateDriverDetailsArgumentsInterface,
} from "./driver-details.types";
import { DriverDetailsInterface } from "@/interfaces/models.interface";

export const createDriverDetailsRequest = (
  args: CreateDriverDetailsArgumentsInterface
): Promise<DriverDetailsInterface> => {
  const { body } = args;

  return axios.post("/driver-details", body);
};

export const updateDriverDetailsRequest = (
  args: UpdateDriverDetailsArgumentsInterface
): Promise<DriverDetailsInterface> => {
  const { body } = args;

  return axios.put("/driver-details", body);
};

export const getDriverDetailsByUserIdRequest = (
  args: GetDriverDetailsByUserIdArgumentsInterface
): Promise<DriverDetailsInterface> => {
  const { params } = args;

  return axios.get(`/driver-details/user/${params.userId}`);
};
