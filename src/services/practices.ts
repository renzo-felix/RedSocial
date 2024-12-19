import { _axios } from "./config";
import { CompanyProfile } from "@/components/companies/profile";
import { company_user_profile_info } from "@/types/companiesTypes";
import { AxiosResponse } from "axios";

export const getPractices = async () => {
  try {
    const response: AxiosResponse = await _axios.get("/practice");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPracticeById = async (id: string) => {
  try {
    const response: AxiosResponse = await _axios.get(`/practice/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePractice = async (data: any) => {
  console.log("Datos a enviar: ", data);
  try {
    const response: AxiosResponse = await _axios.put(`/practice/${data.id}`, {
      //UpdateCompany: {
      Titulo: data.Titulo,
      InfoLarga: data.InfoLarga,
      InfoCorta: data.InfoCorta,
      Finalized: data.Finalized,
      InitDate: data.InitDate,
      CompanyId: data.CompanyId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//====postular a oferta

export const postularOferta = async (userId: any) => {
  try {
    const response: AxiosResponse = await _axios.post(
      `oferta/2/offer-assign-to-user/${userId}`
    );
    alert("te postulaste a la practica");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOfferInfo = async (id: any) => {
  try {
    const response: AxiosResponse = await _axios.get(
      `/oferta/FindUsersByOffer/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// export const getCompanies = async () => {
//   try {
//     const response: AxiosResponse = await _axios.get("/company-user");
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const getCompanieById = async (id: string) => {
//   try {
//     const response: AxiosResponse = await _axios.get(`/company-user/${id}`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const updateCompany = async (data: any) => {
//   console.log("Datos a enviar: ", data);
//   try {
//     const response: AxiosResponse = await _axios.put(
//       `/company-user/UpdateGeneralInformationCompany/${data.id}`,
//       {
//         //UpdateCompany: {
//         Username: data.Username,
//         UserProfile: {
//           Sunac: data.CompanyPerfil.Sunac,
//           GitHub: data.CompanyPerfil.GitHub,
//           imageURL: data.CompanyPerfil.imageURL,
//           Address: data.CompanyPerfil.Address,
//           InfoLarga: data.CompanyPerfil.InfoLarga,
//           PhoneNumber: data.CompanyPerfil.PhoneNumber,
//           InfoCorta: data.CompanyPerfil.InfoCorta,
//           //   },
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
