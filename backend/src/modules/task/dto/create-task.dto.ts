import { TaskCategory, TaskStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class TaskCreateDto {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  description?: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsEnum(TaskCategory)
  category: TaskCategory;

  @IsOptional()
  archived?: boolean;
}
