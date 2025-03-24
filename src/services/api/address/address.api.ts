import axios from "@/config/axios/base-instance";

import { CreateAddressArgumentsInterface } from "./address.types";
import { AddressInterface } from "@/interfaces/models.interface";

export const createAddressRequest = (
  args: CreateAddressArgumentsInterface
): Promise<AddressInterface> => {
  const { body } = args;

  return axios.post("/addresses", body);
};
