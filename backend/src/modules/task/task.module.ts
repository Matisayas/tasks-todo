import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UsersModule } from '../users/users.module';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  imports: [UsersModule],
  controllers: [TaskController],
  providers: [TaskRepository, TaskService, PrismaService],
  exports: [TaskService],
})
export class TaskModule {}
