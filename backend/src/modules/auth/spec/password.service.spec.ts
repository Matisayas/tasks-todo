import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PasswordService } from 'src/modules/auth/password.service';
import { UsersService } from 'src/modules/users/users.service';

jest.mock('bcryptjs');

const mockUser: User = {
  id: '1',
  name: 'John',
  email: 'john@example.com',
  surname: 'Doe',
  phoneNumber: '1234567890',
  password: bcrypt.hash('password123', 10), // Asegúrate de que el hash sea correcto
  role: 'USER',
};

const mockUsersService = {
  findOneByEmail: jest.fn().mockResolvedValue(mockUser),
};

describe('PasswordService', () => {
  let passwordService: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordService,
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    passwordService = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(passwordService).toBeDefined();
  });

  describe('validateOrThrowException', () => {
    it('should return a user if credentials are valid', async () => {
      // Mock bcrypt.compare to return true
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await passwordService.validateOrThrowException(
        'john@example.com',
        'password123', // Esta debe ser la contraseña original que se usó para crear el hash
      );
      expect(result).toEqual(mockUser);
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(
        'john@example.com',
      );
    });

    it('should throw ForbiddenException if user not found', async () => {
      mockUsersService.findOneByEmail.mockResolvedValueOnce(null);

      await expect(
        passwordService.validateOrThrowException(
          'notfound@example.com',
          'password123',
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if password is invalid', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        passwordService.validateOrThrowException(
          'john@example.com',
          'wrongPassword',
        ),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('hash', () => {
    it('should return hashed password', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

      const result = await passwordService.hash('plainPassword');
      expect(result).toEqual('hashedPassword');
      expect(bcrypt.hash).toHaveBeenCalledWith('plainPassword', 10);
    });
  });
});
