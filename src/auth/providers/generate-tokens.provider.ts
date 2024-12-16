import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    /** injecting the jwt configs */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    /** injecting the jwt service */
    private readonly jwtService: JwtService
  ) {}
}
