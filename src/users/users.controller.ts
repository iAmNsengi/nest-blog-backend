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

@Controller('users')
export class UsersController {
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
