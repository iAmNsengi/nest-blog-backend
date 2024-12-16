import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  SetMetadata,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './providers/users.services';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dtos/create-user.dto';
import { CreateManyUsersDTO } from './dtos/create-many-user.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  public getAllUsers() {
    return this.userService.findAll();
  }

  @Get('/:id?')
  @ApiOperation({
    summary: 'Get one user by id'
  })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully'
  })
  public findOneById(
    @Param('id', ParseIntPipe)
    id: number
  ) {
    return this.userService.findOneById(id);
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

  @Auth(AuthType.Bearer)
  @Post('/create-many')
  @ApiOperation({ description: 'Create many users' })
  public createManyUsers(@Body() createManyUsersDTO: CreateManyUsersDTO) {
    return this.userService.createMany(createManyUsersDTO);
  }
}
