import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('before...');

    return next
      .handle()
      .pipe(map((data) => ({ apiVersion: '', data: { ...data } })));
  }
}
