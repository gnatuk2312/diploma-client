export interface CreateDriverDetailsArgumentsInterface {
  body: {
    userId: string;
    description: string;
    email: string;
    phoneNumber: string;
    driverLicenseFileId: string;
  };
}

export interface UpdateDriverDetailsArgumentsInterface {
  body: {
    id: string;
    description: string;
    email: string;
    phoneNumber: string;
    driverLicenseFileId: string;
  };
}

export interface GetDriverDetailsByUserIdArgumentsInterface {
  params: {
    userId: string;
  };
}
