import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { TaskCreateDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/filter-task.dto';
import { TaskUpdateDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly usersService: UsersService,
  ) {}

  async createTask(input: TaskCreateDto): Promise<Task> {
    const createTasks = await this.taskRepository.createTask(input);
    return createTasks;
  }

  findAll(filter?: TaskFilterDto): Promise<Task[]> {
    return this.taskRepository.findAll(filter);
  }

  findOne(id: string): Promise<Task> {
    return this.taskRepository.findOne(id);
  }

  updateTask(input: TaskUpdateDto, id: string): Promise<Task> {
    return this.taskRepository.updateTask(input, id);
  }

  removeTask(id: string): Promise<Task> {
    return this.taskRepository.removeTask(id);
  }
}
