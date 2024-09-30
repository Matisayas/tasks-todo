import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Task, TaskCategory } from '@prisma/client';
import { TaskCreateDto } from './dto/create-task.dto';
import { TaskUpdateDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDto: TaskCreateDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  async findAll(
    @Query('archived') archivedFilter?: string,
    @Query('category') categoryFilter?: TaskCategory,
  ): Promise<Task[]> {
    return this.taskService.findAll({
      archived: archivedFilter === 'true',
      category: categoryFilter,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: TaskUpdateDto,
  ): Promise<Task> {
    return this.taskService.updateTask(updateTaskDto, id);
  }

  @Delete(':id')
  async removeTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.removeTask(id);
  }
}
