import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenDTO } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}
  public async refreshTokens(refreshTokenDTO: RefreshTokenDTO) {
    // verify the refresh token using jwt service
  }
}
