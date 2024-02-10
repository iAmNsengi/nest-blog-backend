import { Body, Controller, Get } from '@nestjs/common';
import { UsersService } from './providers/users.services';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:id?')
  getUsers() {
    return this.userService.findAll();
  }
}
