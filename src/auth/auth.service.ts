import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.services';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService
  ) {}

  public login(email: string, password: string, id: string) {
    // const users = this.usersService.findOneByID(1);
    // console.log(users);

    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return 'I am logged in!';
  }
}
