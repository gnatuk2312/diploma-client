import axios from "@/config/axios/base-instance";

import {
  CreateTrailerArgumentsInterface,
  GetTrailerByIdArgumentsInterface,
  GetTrailerByVehicleIdArgumentsInterface,
  UpdateTrailerArgumentsInterface,
} from "./trailer.types";
import { TrailerInterface } from "@/interfaces/models.interface";

export const createTrailerRequest = (
  args: CreateTrailerArgumentsInterface
): Promise<TrailerInterface> => {
  const { body } = args;

  return axios.post("/trailer", body);
};

export const updateTrailerRequest = (
  args: UpdateTrailerArgumentsInterface
): Promise<TrailerInterface> => {
  const { body } = args;

  return axios.put("/trailer", body);
};

export const getTrailerByVehicleIdRequest = (
  args: GetTrailerByVehicleIdArgumentsInterface
): Promise<TrailerInterface> => {
  const { params } = args;

  return axios.get(`/trailer/vehicle/${params.vehicleId}`);
};

export const getTrailerByIdRequest = (
  args: GetTrailerByIdArgumentsInterface
): Promise<TrailerInterface> => {
  const { params } = args;

  return axios.get(`/trailer/${params.id}`);
};
