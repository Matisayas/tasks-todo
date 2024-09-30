// import { Test, TestingModule } from '@nestjs/testing';
// import { Task, TaskStatus } from '@prisma/client';
// import { AuthPayloadDTO } from 'modules/auth/dto/auth-payload.dto';
// import { TaskCreateDto } from '../dto/create-task.dto';
// import { TaskUpdateDto } from '../dto/update-task.dto';
// import { TaskController } from '../task.controller';
// import { TaskService } from '../task.service';

// describe('TaskController', () => {
//   let taskController: TaskController;
//   let taskService: TaskService;

//   const mockTaskService = {
//     createTask: jest.fn(),
//     findAll: jest.fn(),
//     findOne: jest.fn(),
//     updateTask: jest.fn(),
//     removeTask: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [TaskController],
//       providers: [{ provide: TaskService, useValue: mockTaskService }],
//     }).compile();

//     taskController = module.get<TaskController>(TaskController);
//     taskService = module.get<TaskService>(TaskService);
//   });

//   it('should be defined', () => {
//     expect(taskController).toBeDefined();
//   });

//   describe('createTask', () => {
//     it('should create a task', async () => {
//       const mockUser: AuthPayloadDTO = {
//         id: 'user-id',
//         email: 'test@example.com',
//         name: 'Test User',
//         token: 'some-token',
//         role: 'USER',
//       };
//       const createTaskDto: TaskCreateDto = {
//         title: 'New Task',
//         subtitle: 'Task Subtitle',
//         description: 'Task description',
//         status: 'IN_PROGRESS',
//       };
//       const createdTask: Task = {
//         id: 'task-id',
//         ...createTaskDto,
//         createdAt: new Date(),
//         archived: false,
//         updatedAt: new Date(),
//         description: 'hacer la pieza',
//         status: 'DONE',
//         subtitle: 'completa',
//         title: 'Limpieza',
//       };

//       mockTaskService.createTask.mockResolvedValue(createdTask);

//       const result = await taskController.createTask(createTaskDto);
//       expect(result).toEqual(createdTask);
//       expect(mockTaskService.createTask).toHaveBeenCalledWith(
//         mockUser,
//         createTaskDto,
//       );
//     });
//   });

//   describe('findAll', () => {
//     it('should return all tasks', async () => {
//       const filter = TaskStatus;
//       const tasks: Task[] = [
//         {
//           id: 'task-id-1',
//           title: 'Task 1',
//           subtitle: 'Subtitle 1',
//           description: 'Description 1',
//           status: 'DONE',
//           archived: false,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           id: 'task-id-2',
//           title: 'Task 2',
//           subtitle: 'Subtitle 2',
//           description: 'Description 2',
//           status: 'IN_PROGRESS',
//           archived: false,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ];

//       mockTaskService.findAll.mockResolvedValue(tasks);

//       const result = await taskController.findAll(filter);
//       expect(result).toEqual(tasks);
//       expect(mockTaskService.findAll).toHaveBeenCalledWith(filter);
//     });
//   });

//   describe('findOne', () => {
//     it('should return a task by id', async () => {
//       const task: Task = {
//         id: 'task-id',
//         title: 'Task 1',
//         subtitle: 'Subtitle 1',
//         description: 'Description 1',
//         status: 'IN_PROGRESS',
//         archived: false,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };

//       mockTaskService.findOne.mockResolvedValue(task);

//       const result = await taskController.findOne('task-id');
//       expect(result).toEqual(task);
//       expect(mockTaskService.findOne).toHaveBeenCalledWith('task-id');
//     });
//   });

//   describe('updateTask', () => {
//     it('should update a task', async () => {
//       const input: TaskUpdateDto = {
//         title: 'Updated Task',
//         subtitle: 'Updated Subtitle',
//         description: 'Updated description',
//         status: 'TO_DO',
//       };
//       const updatedTask: Task = {
//         id: 'task-id',
//         ...input,
//         archived: false,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };

//       mockTaskService.updateTask.mockResolvedValue(updatedTask);

//       const result = await taskController.updateTask(input, 'task-id');
//       expect(result).toEqual(updatedTask);
//       expect(mockTaskService.updateTask).toHaveBeenCalledWith(input, 'task-id');
//     });
//   });

//   describe('removeTask', () => {
//     it('should remove a task', async () => {
//       const removedTask: Task = {
//         id: 'task-id',
//         title: 'Task to remove',
//         subtitle: 'Subtitle',
//         description: 'Description',
//         status: 'DONE',
//         archived: false,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };

//       mockTaskService.removeTask.mockResolvedValue(removedTask);

//       const result = await taskController.removeTask('task-id');
//       expect(result).toEqual(removedTask);
//       expect(mockTaskService.removeTask).toHaveBeenCalledWith('task-id');
//     });
//   });
// });
