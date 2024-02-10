import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.services';

@Module({ controllers: [UsersController], providers: [UsersService] })
export class UsersModule {}
