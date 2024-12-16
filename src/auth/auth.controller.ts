import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDTO } from './dtos/signin.dto';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  // Injecting auth service
  constructor(private readonly authService: AuthService) {}

  @Auth(AuthType.None)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signin(signInDTO);
  }
}
