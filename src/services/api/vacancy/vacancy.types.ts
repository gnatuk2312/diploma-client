export interface CreateVacancyArgumentsInterface {
  body: {
    creatorId: string;
    title: string;
    description: string;
    unitPrice: number;
    from: {
      longitude: string;
      latitude: string;
      country: string;
      city: string;
      street: string;
    };
    to: {
      longitude: string;
      latitude: string;
      country: string;
      city: string;
      street: string;
    };
  };
}

export interface GetVacancyByIdArgumentsInterface {
  params: {
    id: string;
  };
}

export interface MarkVacancyAsInProgressArgumentsInterface {
  params: {
    id: string;
  };
}

export interface MarkVacancyAsDeliveredArgumentsInterface {
  params: {
    id: string;
  };
}

export interface GetAppliedVacanciesArgumentsInterface {
  params: {
    userId: string;
  };
}

export interface GetCreatedVacanciesArgumentsInterface {
  params: {
    userId: string;
  };
}

export interface GetStatusInProgressVacanciesArgumentsInterface {
  params: {
    userId: string;
  };
}

export interface GetStatusDeliveredVacanciesArgumentsInterface {
  params: {
    userId: string;
  };
}
