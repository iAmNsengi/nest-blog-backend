import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers() {
    return 'You are on get all users endpoint';
  }

  @Post()
  addUser(@Body() body: any) {
    return body;
  }
}
