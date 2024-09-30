import { Test, TestingModule } from '@nestjs/testing';
import { RoleEnum, Task, TaskStatus } from '@prisma/client';
import { AuthPayloadDTO } from 'src/modules/auth/dto/auth-payload.dto';
import { UsersService } from 'src/modules/users/users.service';
import { TaskCreateDto } from '../dto/create-task.dto';
import { TaskUpdateDto } from '../dto/update-task.dto';
import { TaskRepository } from '../task.repository';
import { TaskService } from '../task.service';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: TaskRepository;
  let usersService: UsersService;

  const mockTaskRepo = {
    createTask: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateTask: jest.fn(),
    removeTask: jest.fn(),
  };

  const mockUsersService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: TaskRepository, useValue: mockTaskRepo },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const input: TaskCreateDto = {
        title: 'New Task',
        subtitle: 'Task Subtitle',
        description: 'Task description',
        status: TaskStatus.IN_PROGRESS,
      };

      const mockUser: AuthPayloadDTO = {
        id: 'user-id',
        email: 'test@test.com',
        name: 'Test User',
        token: 'some-jwt-token',
        role: RoleEnum.USER, // Asignar un valor válido para role
      };

      const createdTask: Task = {
        id: 'task-id',
        ...input,
        userId: mockUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        archived: false,
      };

      mockTaskRepo.createTask.mockResolvedValue(createdTask);

      const result = await taskService.createTask(mockUser, input);
      expect(result).toEqual(createdTask);
      expect(mockTaskRepo.createTask).toHaveBeenCalledWith(mockUser.id, input);
    });
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const tasks: Task[] = [
        {
          id: 'task-id',
          title: 'Task 1',
          subtitle: 'Subtitle 1',
          description: 'Description 1',
          status: TaskStatus.DONE,
          userId: 'user-id',
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
          userId: 'user-id',
          archived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      mockTaskRepo.findAll.mockResolvedValue(tasks);

      const result = await taskService.findAll();
      expect(result).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should return a task by id', async () => {
      const task: Task = {
        id: 'task-id',
        title: 'Task 1',
        subtitle: 'Subtitle 1',
        description: 'Description 1',
        status: TaskStatus.IN_PROGRESS,
        userId: 'user-id',
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTaskRepo.findOne.mockResolvedValue(task);

      const result = await taskService.findOne('task-id');
      expect(result).toEqual(task);
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const input: TaskUpdateDto = {
        title: 'Updated Task',
        subtitle: 'Updated Subtitle',
        description: 'Updated description',
        status: TaskStatus.TO_DO,
      };
      const updatedTask: Task = {
        id: 'task-id',
        ...input,
        userId: 'user-id',
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTaskRepo.updateTask.mockResolvedValue(updatedTask);

      const result = await taskService.updateTask(input, 'task-id');
      expect(result).toEqual(updatedTask);
    });
  });

  describe('removeTask', () => {
    it('should remove a task', async () => {
      const removedTask: Task = {
        id: 'task-id',
        title: 'Task to remove',
        subtitle: 'Subtitle',
        description: 'Description',
        status: TaskStatus.DONE,
        userId: 'user-id',
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTaskRepo.removeTask.mockResolvedValue(removedTask);

      const result = await taskService.removeTask('task-id');
      expect(result).toEqual(removedTask);
    });
  });
});
