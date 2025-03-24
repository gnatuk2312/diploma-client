export interface CreateVehicleArgumentsInterface {
  body: {
    driverId: string;
    brand: string;
    kilometrage: string;
    registrationFileId: string;
  };
}

export interface UpdateVehicleArgumentsInterface {
  body: {
    id: string;
    brand: string;
    kilometrage: string;
    registrationFileId: string;
  };
}

export interface GetVehicleByIdArgumentsInterface {
  params: {
    id: string;
  };
}

export interface GetVehicleByUserIdArgumentsInterface {
  params: {
    userId: string;
  };
}
