import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common';
import { GetUsersParamDTO } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/auth.service';
import { log } from 'console';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dtos/create-user.dto';

/**
 * Class to connect to users table and perform business logics
 */
@Injectable()
export class UsersService {
  /** Constructor */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    /** Injecting UserRepository*/
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  /** Method to find all users */
  public findOneById(
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
      }
    ];
  }
  /** Find user by ID */
  public async findAll() {
    return await this.usersRepository.find();
  }

  public async createUser(createUserDTO: CreateUserDTO) {
    // check if user exists with the same email
    const existingUser = await this.usersRepository.findOne({
      where: {
        email: createUserDTO.email
      }
    });
    if (existingUser)
      throw new HttpException(
        'User with email already exists',
        HttpStatus.BAD_REQUEST
      );

    let newUser = this.usersRepository.create(createUserDTO);

    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }
}
