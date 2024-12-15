import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /** inject jwtService */
    private readonly jwtService: JwtService,
    /** inject jwt configuration */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // extract the request from the execution context
    const request = context.switchToHttp().getRequest();
    // extract token from header
    const token = this.extractRequestFromHeader(request);
    // validate the token
    if (!token)
      throw new UnauthorizedException('Token is missing from the headers');
    try {
      console.log(this.jwtConfiguration);
      console.log(token);

      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration
      );
      request[REQUEST_USER_KEY] = payload;
      console.log(payload);
    } catch (error) {
      console.error('Token verification error:', error);
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  private extractRequestFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return undefined;
    }
    const [, token] = authHeader.split(' ');
    return token;
  }
}
