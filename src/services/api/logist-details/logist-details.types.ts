export interface CreateLogistDetailsArgumentsInterface {
  body: {
    userId: string;
    description: string;
    email: string;
    phoneNumber: string;
  };
}

export interface UpdateLogistDetailsArgumentsInterface {
  body: {
    id: string;
    description: string;
    email: string;
    phoneNumber: string;
  };
}

export interface GetLogistDetailsByUserIdArgumentsInterface {
  params: {
    userId: string;
  };
}
