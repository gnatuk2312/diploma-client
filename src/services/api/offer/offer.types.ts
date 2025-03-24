export interface CreateOfferArgumentsInterface {
  body: {
    vacancyId: string;
    creatorId: string;
    comment: string;
  };
}

export interface GetOfferByIdArgumentsInterface {
  params: {
    id: string;
  };
}

export interface GetAllOffersByVacancyIdArgumentsInterface {
  params: {
    vacancyId: string;
  };
}

export interface AcceptOfferArgumentsInterface {
  params: {
    id: string;
  };
}
