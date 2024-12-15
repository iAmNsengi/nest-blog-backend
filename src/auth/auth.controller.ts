import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDTO } from './dtos/signin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  // Injecting auth service
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  public async signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signin(signInDTO);
  }
}
