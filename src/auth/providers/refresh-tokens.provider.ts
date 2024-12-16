import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { RefreshTokenDTO } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UsersService } from 'src/users/providers/users.services';
import { In } from 'typeorm';
import { ActiveUserInterface } from '../interfaces/active-user-interface';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly generateTokensProvider: GenerateTokensProvider,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService
  ) {}
  public async refreshTokens(refreshTokenDTO: RefreshTokenDTO) {
    // verify the refresh token using jwt service
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserInterface, 'sub'>
      >(refreshTokenDTO.refreshToken, {
        secret: this.jwtConfiguration.secret,
        issuer: this.jwtConfiguration.issuer,
        audience: this.jwtConfiguration.audience
      });
      // fetch user from the database
      const user = await this.usersService.findOneById(sub);
      // generate the tokens
      return await this.generateTokensProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
