import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query
} from '@nestjs/common';
import { UsersService } from './providers/users.services';
import { GetUsersParamDTO } from './dtos/get-users-params.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dtos/create-user.dto';
import RegexCraft from 'regexcraft';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:id?')
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application'
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully'
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'Limit of values',
    default: 10
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'Limit of pages you want',
    default: 1
  })
  getUsers(
    @Param() getUserParamDTO?: GetUsersParamDTO,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number
  ) {
    return this.userService.findAll(getUserParamDTO, limit, page);
  }

  @Post('')
  @ApiOperation({ description: 'Create a new User' })
  @ApiResponse({ status: 200, description: 'User created successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad request, data provided has issues'
  })
  @ApiResponse({ status: 500, description: 'An internal server error occured' })
  public createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }
}
