import axios from "@/config/axios/base-instance";

import {
  CreateVehicleArgumentsInterface,
  GetVehicleByIdArgumentsInterface,
  GetVehicleByUserIdArgumentsInterface,
  UpdateVehicleArgumentsInterface,
} from "./vehicle.types";
import { VehicleInterface } from "@/interfaces/models.interface";

export const createVehicleRequest = (
  args: CreateVehicleArgumentsInterface
): Promise<VehicleInterface> => {
  const { body } = args;

  return axios.post("/vehicle", body);
};

export const updateVehicleRequest = (
  args: UpdateVehicleArgumentsInterface
): Promise<VehicleInterface> => {
  const { body } = args;

  return axios.put("/vehicle", body);
};

export const getVehicleByIdRequest = (
  args: GetVehicleByIdArgumentsInterface
): Promise<VehicleInterface> => {
  const { params } = args;

  return axios.get(`/vehicle/${params.id}`);
};

export const getAllVehiclesByUserIdRequest = (
  args: GetVehicleByUserIdArgumentsInterface
): Promise<VehicleInterface[]> => {
  const { params } = args;

  return axios.get(`/vehicle/user/${params.userId}`);
};
