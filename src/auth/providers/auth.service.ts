import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.services';
import { SignInDTO } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { RefreshTokenDTO } from '../dtos/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    /** injecting the refreshTokensProvider */
    private readonly refreshTokensProvider: RefreshTokensProvider,
    /** inject signIn provider */
    private readonly signInProvider: SignInProvider
  ) {}

  public async signin(signInDTO: SignInDTO) {
    return await this.signInProvider.signin(signInDTO);
  }

  public async refreshTokens(refreshTokenDTO: RefreshTokenDTO) {
    return this.refreshTokensProvider.refreshTokens(refreshTokenDTO);
  }
}
