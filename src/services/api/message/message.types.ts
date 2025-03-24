export interface CreateMessageArgumentsInterface {
  body: {
    chatId: string;
    creatorId: string;
    content: string;
  };
}

export interface GetAllMessagesByChatIdArgumentsInterface {
  params: {
    chatId: string;
  };
}
