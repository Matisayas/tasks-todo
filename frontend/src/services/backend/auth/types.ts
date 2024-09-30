export enum RoleEnum {
  USER,
}
export interface AuthPayloadDTO {
  avatar?: File;
  email: string;
  id: string;
  name: string;
  phone?: string;
  token: string;
  googleId?: string;
  role: RoleEnum;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: RoleEnum;
  };
  token: string;
}
