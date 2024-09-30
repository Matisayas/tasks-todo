import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleEnum } from '@prisma/client';
import { PasswordService } from 'src/modules/auth/password.service';
import { UsersCreateDto } from '../dto/create-user.dto';
import { UsersUpdateDto } from '../dto/update-user.dto';
import { UsersRepository } from '../users.repository';
import { UsersService } from '../users.service';

// Mock de usuario con tareas
const mockUserRepo = {
  id: '1',
  name: 'John',
  email: 'john@example.com',
  surname: 'Doe',
  phoneNumber: '1234567890',
  password: 'hashedPassword',
  role: RoleEnum.USER,
  tasks: [],
};

// Define el tipo del mock
type MockUsersRepository = {
  findOneByEmail: jest.Mock<Promise<typeof mockUserRepo | null>, [string]>;
  createUser: jest.Mock<Promise<typeof mockUserRepo>, [any]>;
  findOne: jest.Mock<Promise<typeof mockUserRepo | null>, [string]>;
  findAll: jest.Mock<Promise<(typeof mockUserRepo)[]>, []>;
  updateUser: jest.Mock<
    Promise<typeof mockUserRepo | null>,
    [string, Partial<UsersUpdateRepoInput>]
  >;
  removeUser: jest.Mock<Promise<typeof mockUserRepo | null>, [string]>;
};

// Define el tipo de entrada para la actualización del usuario
interface UsersUpdateRepoInput {
  name?: string;
  surname?: string;
  password?: string;
  phoneNumber?: string;
}

// Mock del repositorio de usuarios
const mockUsersRepository: MockUsersRepository = {
  findOneByEmail: jest.fn().mockResolvedValue(mockUserRepo),
  createUser: jest.fn().mockResolvedValue(mockUserRepo),
  findOne: jest.fn().mockResolvedValue(mockUserRepo),
  findAll: jest.fn().mockResolvedValue([mockUserRepo]),
  updateUser: jest
    .fn()
    .mockImplementation((id: string, input: Partial<UsersUpdateRepoInput>) => {
      if (id !== '1') return Promise.resolve(null);
      return Promise.resolve({ ...mockUserRepo, ...input });
    }),
  removeUser: jest.fn().mockImplementation((id: string) => {
    if (id !== '1') return Promise.resolve(null);
    return Promise.resolve(mockUserRepo);
  }),
};

// Mock del servicio de contraseñas
const mockPasswordService = {
  hash: jest.fn().mockResolvedValue('hashedPassword'),
};

describe('UsersService', () => {
  let usersService: UsersService;
  let passwordService: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockUsersRepository },
        { provide: PasswordService, useValue: mockPasswordService },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    passwordService = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findOneByEmail', () => {
    it('should return a user if found', async () => {
      const user = await usersService.findOneByEmail('john@example.com');
      expect(user).toEqual(mockUserRepo);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUsersRepository.findOneByEmail.mockResolvedValue(null);
      await expect(
        usersService.findOneByEmail('notfound@example.com'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const input: UsersCreateDto = {
        name: 'John',
        email: 'john@example.com',
        surname: 'Doe',
        phoneNumber: '1234567890',
        password: 'plainPassword',
      };

      const user = await usersService.createUser(input);
      expect(user).toEqual(mockUserRepo);
      expect(passwordService.hash).toHaveBeenCalledWith('plainPassword');
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const user = await usersService.findOne('1');
      expect(user).toEqual(mockUserRepo);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);
      await expect(usersService.findOne('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await usersService.findAll();
      expect(users).toEqual([mockUserRepo]);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const input: UsersUpdateDto = {
        name: 'John Updated',
        email: 'john.updated@example.com',
      };

      const updatedUser = await usersService.updateUser('1', input);
      expect(updatedUser.name).toEqual('John Updated');
      expect(updatedUser.email).toEqual('john.updated@example.com');
    });

    it('should throw NotFoundException if user not found', async () => {
      const input: UsersUpdateDto = {
        email: 'test@test.com',
        password: '123456',
        name: 'Nonexistent User',
      };
      mockUsersRepository.updateUser.mockResolvedValue(null);

      await expect(usersService.updateUser('999', input)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('removeUser', () => {
    it('should remove an existing user', async () => {
      const removedUser = await usersService.removeUser('1');
      expect(removedUser).toEqual(mockUserRepo);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUsersRepository.removeUser.mockResolvedValue(null);

      await expect(usersService.removeUser('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
