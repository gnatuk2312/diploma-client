import axios from "@/config/axios/base-instance";

import {
  CreateVacancyArgumentsInterface,
  GetAppliedVacanciesArgumentsInterface,
  GetCreatedVacanciesArgumentsInterface,
  GetStatusDeliveredVacanciesArgumentsInterface,
  GetStatusInProgressVacanciesArgumentsInterface,
  GetVacancyByIdArgumentsInterface,
  MarkVacancyAsDeliveredArgumentsInterface,
  MarkVacancyAsInProgressArgumentsInterface,
} from "./vacancy.types";
import { VacancyInterface } from "@/interfaces/models.interface";

export const createVacancyRequest = (
  args: CreateVacancyArgumentsInterface
): Promise<VacancyInterface> => {
  const { body } = args;

  return axios.post("/vacancies", body);
};

export const getVacancyByIdRequest = (
  args: GetVacancyByIdArgumentsInterface
): Promise<VacancyInterface> => {
  const { params } = args;

  return axios.get(`/vacancies/${params.id}`);
};

export const getAllVacanciesRequest = (): Promise<VacancyInterface[]> => {
  return axios.get("/vacancies");
};

export const markVacancyAsInProgressRequest = (
  args: MarkVacancyAsInProgressArgumentsInterface
): Promise<VacancyInterface> => {
  const { params } = args;

  return axios.patch(`/vacancies/${params.id}/in-progress`);
};

export const markVacancyAsDeliveredRequest = (
  args: MarkVacancyAsDeliveredArgumentsInterface
): Promise<VacancyInterface> => {
  const { params } = args;

  return axios.patch(`/vacancies/${params.id}/delivered`);
};

export const getStatusNewVacanciesRequest = (): Promise<VacancyInterface[]> => {
  return axios.get("/vacancies/status/new");
};

export const getAppliedVacanciesRequest = (
  args: GetAppliedVacanciesArgumentsInterface
): Promise<VacancyInterface[]> => {
  const { params } = args;

  return axios.get(`/vacancies/applied/${params.userId}`);
};

export const getCreatedVacanciesRequest = (
  args: GetCreatedVacanciesArgumentsInterface
): Promise<VacancyInterface[]> => {
  const { params } = args;

  return axios.get(`/vacancies/created/${params.userId}`);
};

export const getStatusInProgressVacanciesRequest = (
  args: GetStatusInProgressVacanciesArgumentsInterface
): Promise<VacancyInterface[]> => {
  const { params } = args;

  return axios.get(`/vacancies/status/in-progress/${params.userId}`);
};

export const getStatusDeliveredVacanciesRequest = (
  args: GetStatusDeliveredVacanciesArgumentsInterface
): Promise<VacancyInterface[]> => {
  const { params } = args;

  return axios.get(`/vacancies/status/delivered/${params.userId}`);
};
