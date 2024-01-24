import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { GetUsersParamDTO } from './dtos/get-users-params.dto';
import { UsersService } from './providers/users.services';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers() {
    return 'You are on get all users endpoint';
  }

  @Get('/:id')
  public getUserById(@Param() getUserParamDto: GetUsersParamDTO) {
    console.log(getUserParamDto);

    return 'You sent a get request to get user by Id';
  }
  @Post()
  addUser(@Body() createUserDTO: CreateUserDTO) {
    return createUserDTO;
  }
}
