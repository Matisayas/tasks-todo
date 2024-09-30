import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersCreateDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() input: UsersCreateDto) {
    return this.usersService.createUser(input);
  }

  @Get()
  findOne(@Param() id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get(':email')
  finOneByEmail(@Query('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }
}
