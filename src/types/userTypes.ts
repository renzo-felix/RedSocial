export interface UserRegister {
  nombre: string;
  apellido: string;
  email: string;
  contraseña: string;
  foto: string;
  isAdmin?: boolean;
}

export interface UserLogin {
  message: string;
  isAdmin: boolean;
}

export interface UserState {
  id: number;
  slug: string;
  email: string;
  isAdmin: boolean;
  name: string;
  surname: string;
  //isDisabled: boolean;
  profileImageUrl: string;
  type?: string;
  gitHubUserName?: string;
}