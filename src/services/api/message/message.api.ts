import axios from "@/config/axios/base-instance";

import {
  CreateMessageArgumentsInterface,
  GetAllMessagesByChatIdArgumentsInterface,
} from "./message.types";
import { MessageInterface } from "@/interfaces/models.interface";

export const createMessageRequest = (
  args: CreateMessageArgumentsInterface
): Promise<MessageInterface> => {
  const { body } = args;

  return axios.post("/messages", body);
};

export const getAllMessagesByChatIdRequest = (
  args: GetAllMessagesByChatIdArgumentsInterface
): Promise<MessageInterface[]> => {
  const { params } = args;

  return axios.get(`/messages/chat/${params.chatId}`);
};
