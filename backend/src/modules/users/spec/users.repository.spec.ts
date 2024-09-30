import { Test, TestingModule } from '@nestjs/testing';
import { RoleEnum, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UsersRepository } from '../users.repository';

const mockUserRepo: User = {
  id: '1',
  name: 'John',
  email: 'john@example.com',
  surname: 'Doe',
  phoneNumber: '1234567890',
  password: 'hashedPassword',
  role: RoleEnum.USER,
};

const mockPrismaService = {
  user: {
    create: jest.fn().mockResolvedValue(mockUserRepo),
    findMany: jest.fn().mockResolvedValue([mockUserRepo]),
    findFirst: jest.fn().mockResolvedValue(mockUserRepo),
    findUnique: jest.fn().mockResolvedValue(mockUserRepo),
    update: jest.fn().mockResolvedValue(mockUserRepo),
    delete: jest.fn().mockResolvedValue(mockUserRepo),
  },
};

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const input = {
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        password: 'plainPassword',
        phoneNumber: '1234567890',
      };

      const user = await usersRepository.createUser(input);
      expect(user).toEqual(mockUserRepo);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: { ...input, role: RoleEnum.USER },
        include: expect.any(Object),
      });
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const user = await usersRepository.findOne('1');
      expect(user).toEqual(mockUserRepo);
      expect(mockPrismaService.user.findFirst).toHaveBeenCalledWith({
        where: { id: '1' },
        include: expect.any(Object),
      });
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user if found', async () => {
      const user = await usersRepository.findOneByEmail('john@example.com');
      expect(user).toEqual(mockUserRepo);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
        include: expect.any(Object),
      });
    });
  });
});
