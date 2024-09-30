import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
};

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('register', () => {
    it('should successfully register a user', async () => {
      const registerDto: RegisterDto = {
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
      };

      mockAuthService.register.mockResolvedValue({
        id: '1',
        name: 'John',
        email: 'john@example.com',
      });

      const result = await authController.register(registerDto);
      expect(result).toEqual({
        id: '1',
        name: 'John',
        email: 'john@example.com',
      });
      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('should successfully log in and return a token', async () => {
      const loginDto: LoginDto = {
        email: 'john@example.com',
        password: 'password123',
      };

      const mockResponse = {
        user: { id: '1', name: 'John', email: 'john@example.com' },
        token: 'jwt.token',
      };
      mockAuthService.login.mockResolvedValue(mockResponse);

      const result = await authController.login(loginDto);
      expect(result).toEqual(mockResponse);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
  });
});
