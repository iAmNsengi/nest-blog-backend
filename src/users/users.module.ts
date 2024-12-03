import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.services';

@Module({})
export class UsersModule {
  controllers: [UsersController];
  providers: [UsersService];
}
