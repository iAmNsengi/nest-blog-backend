import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDTO } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/auth.service';
import { log } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}
  public findAll(
    getUserParamDTO: GetUsersParamDTO,
    limit: number,
    page: number
  ) {
    console.log(getUserParamDTO);
    const isAuth = this.authService.isAuth();
    console.log(isAuth);

    return [
      {
        firstName: 'John',
        email: 'john@gmail.com'
      },
      {
        firstName: 'Karera',
        email: 'karera@gmail.com'
      },
      {
        firstName: 'Johnson',
        email: 'johnson@gmail.com'
      }
    ];
  }

  public findOneByID(id: number) {
    return {
      firstName: 'John',
      email: 'john@gmail.com',
      id: 1
    };
  }
}
