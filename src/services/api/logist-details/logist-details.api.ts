import axios from "@/config/axios/base-instance";

import {
  CreateLogistDetailsArgumentsInterface,
  GetLogistDetailsByUserIdArgumentsInterface,
  UpdateLogistDetailsArgumentsInterface,
} from "./logist-details.types";
import { LogistDetailsInterface } from "@/interfaces/models.interface";

export const createLogistDetailsRequest = (
  args: CreateLogistDetailsArgumentsInterface
): Promise<LogistDetailsInterface> => {
  const { body } = args;

  return axios.post("/logist-details", body);
};

export const updateLogistDetailsRequest = (
  args: UpdateLogistDetailsArgumentsInterface
): Promise<LogistDetailsInterface> => {
  const { body } = args;

  return axios.put("/logist-details", body);
};

export const getLogistDetailsByUserIdRequest = (
  args: GetLogistDetailsByUserIdArgumentsInterface
): Promise<LogistDetailsInterface> => {
  const { params } = args;

  return axios.get(`/logist-details/user/${params.userId}`);
};
