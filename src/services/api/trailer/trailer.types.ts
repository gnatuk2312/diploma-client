export interface CreateTrailerArgumentsInterface {
  body: {
    vehicleId: string;
    height: number;
    width: number;
    length: number;
    weight: number;
    loadCapacity: number;
    registrationFileId: string;
  };
}

export interface UpdateTrailerArgumentsInterface {
  body: {
    id: string;
    height: number;
    width: number;
    length: number;
    weight: number;
    loadCapacity: number;
    registrationFileId: string;
  };
}

export interface GetTrailerByVehicleIdArgumentsInterface {
  params: {
    vehicleId: string;
  };
}

export interface GetTrailerByIdArgumentsInterface {
  params: {
    id: string;
  };
}
