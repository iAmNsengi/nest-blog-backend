import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDTO } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/auth.service';
import { log } from 'console';

/**
 * Class to connect to users table and perform business logics
 */
@Injectable()
export class UsersService {
  /**
   * Constructor
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}
  /**
   * Method to find all users
   */
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
  /**
   * Find user by ID
   */
  public findOneByID(id: number) {
    return {
      firstName: 'John',
      email: 'john@gmail.com',
      id: 1
    };
  }
}
