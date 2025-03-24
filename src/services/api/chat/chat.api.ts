import axios from "@/config/axios/base-instance";

import {
  CreateChatArgumentsInterface,
  GetChatByIdArgumentsInterface,
  GetChatByVacancyIdArgumentsInterface,
} from "./chat.types";
import { ChatInterface } from "@/interfaces/models.interface";

export const createChatRequest = (
  args: CreateChatArgumentsInterface
): Promise<ChatInterface> => {
  const { body } = args;

  return axios.post("/chats", body);
};

export const getChatByIdRequest = (
  args: GetChatByIdArgumentsInterface
): Promise<ChatInterface> => {
  const { params } = args;

  return axios.get(`/chats/${params.id}`);
};

export const getChatByVacancyIdRequest = (
  args: GetChatByVacancyIdArgumentsInterface
): Promise<ChatInterface> => {
  const { params } = args;

  return axios.get(`/chats/vacancies/${params.vacancyId}`);
};
