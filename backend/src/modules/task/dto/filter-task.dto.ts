import { TaskCategory } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class TaskFilterDto {
  archived?: boolean;

  @IsEnum(TaskCategory)
  category: TaskCategory;
}
