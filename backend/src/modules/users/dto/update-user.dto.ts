import { IsOptional, IsString } from 'class-validator';

export class UsersUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;
}
