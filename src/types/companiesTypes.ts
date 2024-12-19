export interface company_prof_info {
  CompanyUserId: number;
  Sunac: string;
  GitHub?: null;
  IndustrySector: string;
  imageURL?: null;
  PhoneNumber?: null;
  Address?: null;
  InfoCorta: string;
  InfoLarga: string;
  PortadaImg?: null;
}

export interface company_user_info {
  id: number;
  UserName: string;
  email: string;
  Password: string;
}

export interface company_user_profile_info {
  id: number;
  Username: string;
  email: string;
  Password: string;
  CompanyPerfil: {
    Sunac: string;
    GitHub?: string;
    IndustrySector: string;
    imageURL?: string;
    PhoneNumber?: string;
    Description?: string;
    Address?: string;
    InfoCorta: string;
    InfoLarga: string;
    PortadaImg?: string;
    CompanyUserId: number;
  };
}
