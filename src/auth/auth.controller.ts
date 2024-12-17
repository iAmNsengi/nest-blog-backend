import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDTO } from './dtos/signin.dto';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDTO } from './dtos/refresh-token.dto';
import { GoogleTokenDTO } from './social/dtos/google-token.dto';
import { GoogleAuthenticationService } from './social/providers/google-authentication/google-authentication.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  // Injecting auth service
  constructor(
    private readonly authService: AuthService,
    /** injecting the google auth provider */
    private readonly googleAuthProvider: GoogleAuthenticationService
  ) {}

  @Auth(AuthType.None)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signin(signInDTO);
  }

  @Auth(AuthType.None)
  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  public async refreshTokens(@Body() refreshTokenDTO: RefreshTokenDTO) {
    return await this.authService.refreshTokens(refreshTokenDTO);
  }

  @Auth(AuthType.None)
  @Post('google-authentication')
  public async googleAuth(@Body() googleAuthDTO: GoogleTokenDTO) {
    return await this.googleAuthProvider.authenticate(googleAuthDTO);
  }
}
