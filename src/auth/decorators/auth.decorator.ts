import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';
import { AuthType } from '../enums/auth-type.enum';

// auth is a decorator which takes in only two types of arguments by now
export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
