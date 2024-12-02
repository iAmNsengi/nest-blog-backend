import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers() {
    return 'You are on get all users endpoint';
  }

  @Post()
  addUser(@Body() createUserDTO: CreateUserDTO) {
    return createUserDTO;
  }
}
