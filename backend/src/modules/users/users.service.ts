import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PasswordService } from '../auth/password.service';
import { UsersCreateDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  usersService: any;
  constructor(
    @Inject(forwardRef(() => PasswordService))
    private readonly passwordService: PasswordService,
    private readonly usersRepo: UsersRepository,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepo.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async createUser(input: UsersCreateDto): Promise<User> {
    const hashedPassword = await this.passwordService.hash(input.password);

    try {
      return await this.usersRepo.createUser({
        name: input.name,
        email: input.email,
        surname: input.surname,
        phoneNumber: input.phoneNumber,
        password: hashedPassword,
      });
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findOne(id: string) {
    const user = await this.usersRepo.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
