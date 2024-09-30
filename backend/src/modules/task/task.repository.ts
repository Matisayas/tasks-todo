import { Injectable } from '@nestjs/common';
import { Task, TaskCategory, TaskStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

interface TaskCreateRepoInput {
  title: string;
  subtitle: string;
  status: TaskStatus;
  description?: string;
  archived?: boolean;
  category: TaskCategory;
}

interface TaskUpdateRepoInput {
  title?: string;
  subtitle?: string;
  description?: string;
  status?: TaskStatus;
  archived?: boolean;
  category?: TaskCategory;
}

interface TaskFilterRepoInput {
  archived?: boolean;
  category?: TaskCategory;
}
@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  createTask(input: TaskCreateRepoInput): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: input.title,
        description: input.description,
        status: input.status,
        subtitle: input.subtitle,
        archived: input.archived,
        category: input.category,
      },
    });
  }

  findAll(filter?: TaskFilterRepoInput): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        archived: filter.archived,
        category: filter.category,
      },
    });
  }

  findOne(id: string): Promise<Task> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  updateTask(input: TaskUpdateRepoInput, id: string): Promise<Task> {
    return this.prisma.task.update({
      data: {
        subtitle: input.subtitle,
        title: input.title,
        description: input.description,
        status: input.status,
        archived: input.archived,
        category: input.category,
      },
      where: {
        id,
      },
    });
  }

  removeTask(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
