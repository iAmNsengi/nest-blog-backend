import {
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
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:id?')
  // @ApiBody('')
  getUsers(
    @Param() getUserParamDTO?: GetUsersParamDTO,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number
  ) {
    return this.userService.findAll(getUserParamDTO, limit, page);
  }

  @Post('')
  public createUser() {
    return 'create User endpoint';
  }
}
