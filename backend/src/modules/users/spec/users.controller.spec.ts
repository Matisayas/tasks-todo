import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { UsersCreateDto } from '../dto/create-user.dto';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

const mockUser: User = {
  id: '1',
  name: 'John',
  email: 'john@example.com',
  surname: 'Doe',
  phoneNumber: '1234567890',
  password: 'hashedPassword',
  role: 'USER',
};

const mockUsersService = {
  createUser: jest.fn().mockResolvedValue(mockUser),
  findAll: jest.fn().mockResolvedValue([mockUser]),
  findOne: jest.fn().mockResolvedValue(mockUser),
  findOneByEmail: jest.fn().mockResolvedValue(mockUser),
  updateUser: jest.fn().mockResolvedValue(mockUser),
  removeUser: jest.fn().mockResolvedValue(mockUser),
};

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const input: UsersCreateDto = {
        name: 'John',
        email: 'john@example.com',
        surname: 'Doe',
        phoneNumber: '1234567890',
        password: 'plainPassword',
      };

      const user = await usersController.createUser(input);
      expect(user).toEqual(mockUser);
      expect(mockUsersService.createUser).toHaveBeenCalledWith(input);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const user = await usersController.findOne('1');
      expect(user).toEqual(mockUser);
      expect(mockUsersService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user if found by email', async () => {
      const email = 'john@example.com';
      const user = await usersController.finOneByEmail(email);
      expect(user).toEqual(mockUser);
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(email);
    });
  });
});
