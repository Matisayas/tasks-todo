import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { PasswordService } from 'src/modules/auth/password.service';
import { UsersService } from 'src/modules/users/users.service';
import { UpdateUserDto } from '../dto/update-profile.dto';

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
  findOneByEmail: jest.fn().mockResolvedValue(mockUser),
  updateUser: jest.fn().mockResolvedValue(mockUser),
};

const mockJwtService = {
  signAsync: jest.fn().mockResolvedValue('jwt.token'),
};

const mockPasswordService = {
  validateOrThrowException: jest.fn().mockResolvedValue(mockUser),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: PasswordService, useValue: mockPasswordService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const input: RegisterDto = {
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
      };

      const result = await authService.register(input);
      expect(result).toEqual({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
      });
      expect(mockUsersService.createUser).toHaveBeenCalledWith(input);
    });

    it('should throw BadRequestException on duplicate email', async () => {
      mockUsersService.createUser.mockRejectedValueOnce({ code: 'P2002' });
      const input: RegisterDto = {
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
      };

      await expect(authService.register(input)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('login', () => {
    it('should return a login token', async () => {
      const loginDto: LoginDto = {
        email: 'john@example.com',
        password: 'password123',
      };

      const result = await authService.login(loginDto);
      expect(result).toEqual({
        user: mockUser,
        token: 'jwt.token',
      });
      expect(mockPasswordService.validateOrThrowException).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
    });
  });

  describe('updateProfile', () => {
    it('should update user profile and return a new token', async () => {
      const input: UpdateUserDto = {
        name: 'John Updated',
        email: 'john@example.com',
      };
      const email = 'john@example.com';

      const result = await authService.updateProfile(input, email);
      expect(result).toEqual({
        user: mockUser,
        token: 'jwt.token',
      });
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(email);
      expect(mockUsersService.updateUser).toHaveBeenCalledWith(
        mockUser.id,
        input,
      );
    });

    it('should throw BadRequestException if user not found', async () => {
      mockUsersService.findOneByEmail.mockResolvedValueOnce(null);
      const input: UpdateUserDto = {
        name: 'John Updated',
        email: 'notfound@example.com',
      };
      const email = 'notfound@example.com';

      await expect(authService.updateProfile(input, email)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
