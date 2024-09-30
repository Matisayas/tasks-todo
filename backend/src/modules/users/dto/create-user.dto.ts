import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UsersCreateDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  password: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  googleId?: string;
}
