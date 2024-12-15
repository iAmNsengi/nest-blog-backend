import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    // hashingProvider needs to be provided hence it is an abstract class and it can't be instantiated and its implementation is in BcryptProvider
    { provide: HashingProvider, useClass: BcryptProvider }
  ],
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService]
})
export class AuthModule {}
