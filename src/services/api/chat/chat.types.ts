export interface CreateChatArgumentsInterface {
  body: {
    vacancyId: string;
    participantIds: string[];
  };
}

export interface GetChatByIdArgumentsInterface {
  params: {
    id: string;
  };
}

export interface GetChatByVacancyIdArgumentsInterface {
  params: {
    vacancyId: string;
  };
}
