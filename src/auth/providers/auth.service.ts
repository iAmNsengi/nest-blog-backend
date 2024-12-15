import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.services';
import { SignInDTO } from '../dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService
  ) {}

  public signin(signInDTO: SignInDTO) {
    // find uer using email 
    // throw an exception when user not found
    // compare password to the hash
    // send confirmation
    
    return 
  }
}
