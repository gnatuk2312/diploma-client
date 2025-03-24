import axios from "@/config/axios/base-instance";

import {
  AcceptOfferArgumentsInterface,
  CreateOfferArgumentsInterface,
  GetAllOffersByVacancyIdArgumentsInterface,
  GetOfferByIdArgumentsInterface,
} from "./offer.types";
import { OfferInterface } from "@/interfaces/models.interface";

export const createOfferRequest = (
  args: CreateOfferArgumentsInterface
): Promise<OfferInterface> => {
  const { body } = args;

  return axios.post("/offers", body);
};

export const getOfferByIdRequest = (
  args: GetOfferByIdArgumentsInterface
): Promise<OfferInterface> => {
  const { params } = args;

  return axios.get(`/offers/${params.id}`);
};

export const getAllOffersByVacancyIdRequest = (
  args: GetAllOffersByVacancyIdArgumentsInterface
): Promise<OfferInterface[]> => {
  const { params } = args;

  return axios.get(`/offers/vacancies/${params.vacancyId}`);
};

export const acceptOfferRequest = (
  args: AcceptOfferArgumentsInterface
): Promise<OfferInterface> => {
  const { params } = args;

  return axios.patch(`/offers/accept/${params.id}`);
};
