export interface GetUserByIdArgumentsInterface {
  params: {
    id: string;
  };
}

export interface CreateUserArgumentsInterface {
  body: {
    username: string;
    password: string;
    role: string;
  };
}
