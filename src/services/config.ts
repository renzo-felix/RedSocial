import axios, { AxiosResponse, AxiosError } from "axios";

//import { UserLogin, UserRegister } from "types/";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const _axios = axios.create({
  baseURL: API_URL,
  //withCredentials: true, // Esta línea asegura que las cookies se incluyan en las solicitudes
  // headers: {
  //   "Content-Type": "application/json",
  // },
});
