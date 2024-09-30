import { Injectable } from '@nestjs/common';
import { RoleEnum, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

interface UsersCreateRepoInput {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface UsersUpdateRepoInput {
  name?: string;
  surname?;
  password?: string;
  phoneNumber?: string;
}

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  createUser(input: UsersCreateRepoInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: input.name,
        surname: input.surname,
        password: input.password,
        email: input.email,
        phoneNumber: input.phoneNumber,
        role: RoleEnum.USER,
      },
    });
  }

  findOne(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
