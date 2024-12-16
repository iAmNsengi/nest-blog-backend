import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ActiveUserInterface } from '../interfaces/active-user-interface';
import { User } from 'src/users/user.entity';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    /** injecting the jwt configs */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    /** injecting the jwt service */
    private readonly jwtService: JwtService
  ) {}

  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn
      }
    );
  }

  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      // generate acccess tokens
      this.signToken<Partial<ActiveUserInterface>>(
        user.id,
        this.jwtConfiguration.accessTokenTTL,
        {
          email: user.email
        }
      ),
      // generate refresh tokens
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTTL)
    ]);
    return { accessToken, refreshToken };
  }
}
