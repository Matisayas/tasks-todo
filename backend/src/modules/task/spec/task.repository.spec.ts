import { Test, TestingModule } from '@nestjs/testing';
import { Task, TaskStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { TaskRepository } from '../task.repository';

const mockPrismaService = {
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('TaskRepository', () => {
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(taskRepository).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const input = {
        title: 'New Task',
        subtitle: 'Task Subtitle',
        description: 'Task description',
        status: TaskStatus.IN_PROGRESS,
        archived: false,
      };

      const mockTask: Task = {
        id: 'task-id',
        title: input.title,
        subtitle: input.subtitle,
        description: input.description,
        status: input.status,
        archived: input.archived,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.task.create.mockResolvedValue(mockTask);

      const result = await taskRepository.createTask(input);
      expect(result).toEqual(mockTask);
      expect(mockPrismaService.task.create).toHaveBeenCalledWith({
        include: expect.anything(), // o un valor específico si quieres ser más estricto
        data: {
          ...input,
          user: {
            connect: { id: 'user-id' },
          },
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all tasks for a user', async () => {
      const mockTasks: Task[] = [
        {
          id: 'task-id-1',
          title: 'Task 1',
          subtitle: 'Subtitle 1',
          description: 'Description 1',
          status: TaskStatus.DONE,
          archived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'task-id-2',
          title: 'Task 2',
          subtitle: 'Subtitle 2',
          description: 'Description 2',
          status: TaskStatus.IN_PROGRESS,
          archived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrismaService.task.findMany.mockResolvedValue(mockTasks);

      const result = await taskRepository.findAll();
      expect(result).toEqual(mockTasks);
      expect(mockPrismaService.task.findMany).toHaveBeenCalledWith({
        include: expect.anything(),
      });
    });
  });

  describe('findOne', () => {
    it('should return a task by id', async () => {
      const mockTask: Task = {
        id: 'task-id',
        title: 'Task 1',
        subtitle: 'Subtitle 1',
        description: 'Description 1',
        status: TaskStatus.IN_PROGRESS,
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);

      const result = await taskRepository.findOne('task-id');
      expect(result).toEqual(mockTask);
      expect(mockPrismaService.task.findUnique).toHaveBeenCalledWith({
        include: expect.anything(),
        where: { id: 'task-id' },
      });
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const input = {
        title: 'Updated Task',
        subtitle: 'Updated Subtitle',
        description: 'Updated description',
        status: TaskStatus.TO_DO,
      };

      const mockTask: Task = {
        id: 'task-id',
        ...input,
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'Hacer la pieza',
        status: 'DONE',
        subtitle: 'completa',
        title: 'Limpieza',
      };

      mockPrismaService.task.update.mockResolvedValue(mockTask);

      const result = await taskRepository.updateTask(input, 'task-id');
      expect(result).toEqual(mockTask);
      expect(mockPrismaService.task.update).toHaveBeenCalledWith({
        include: expect.anything(),
        data: input,
        where: { id: 'task-id' },
      });
    });
  });

  describe('removeTask', () => {
    it('should remove a task', async () => {
      const mockTask: Task = {
        id: 'task-id',
        title: 'Task to remove',
        subtitle: 'Subtitle',
        description: 'Description',
        status: TaskStatus.DONE,
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.task.delete.mockResolvedValue(mockTask);

      const result = await taskRepository.removeTask('task-id');
      expect(result).toEqual(mockTask);
      expect(mockPrismaService.task.delete).toHaveBeenCalledWith({
        include: expect.anything(),
        where: { id: 'task-id' },
      });
    });
  });
});
