import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers() {
    return 'You are on get all users endpoint';
  }

  @Post()
  addUser() {
    return 'You are on add user endpoint';
  }
}
