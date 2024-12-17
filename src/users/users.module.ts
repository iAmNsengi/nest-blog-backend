import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.services';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import profileConfig from './config/profileConfig';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyProvider,
    CreateUserProvider,
    FindOneUserByEmailProvider,
    FindOneByGoogleIdProvider
  ],
  exports: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(profileConfig),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider())
  ]
})
export class UsersModule {}
