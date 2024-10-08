import { RoleEnum, User } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class AuthPayloadDTO {
  avatar?: File;
  email: string;
  id: string;
  name: string;
  phone?: string;
  token: string;
  googleId?: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;
}

export class LoginResponse {
  user: User;
  token: string;
}
