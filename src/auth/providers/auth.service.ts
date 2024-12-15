import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.services';
import { SignInDTO } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    /** inject signIn provider */
    private readonly signInProvider: SignInProvider
  ) {}

  public async signin(signInDTO: SignInDTO) {
    return await this.signInProvider.signin(signInDTO);
  }
}
