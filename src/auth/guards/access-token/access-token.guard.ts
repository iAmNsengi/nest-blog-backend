import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import jwtConfig from 'src/auth/config/jwt.config';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /** inject jwtService */
    private readonly jwtService: JwtService,
    /** inject jwt configuration */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // extract the request from the execution context
    const request = context.switchToHttp().getRequest();
    // extract token from header
    const token = this.extractRequestFromHeader(request);
    // validate the token
    
    return true;
  }

  private extractRequestFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
