import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException
} from '@nestjs/common';
import { GetUsersParamDTO } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/auth.service';
import { log } from 'console';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profileConfig';
import requestTimeoutError from 'src/errors/RequestTimeout';

/**
 * Class to connect to users table and perform business logics
 */
@Injectable()
export class UsersService {
  /** Constructor */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>
  ) {}

  public async findAll() {
    let users = undefined;
    try {
      users = this.usersRepository.find();
    } catch (error) {
      requestTimeoutError();
    }
    return users;
  }

  public async findOneById(id: number) {
    let users = undefined;
    try {
      users = await this.usersRepository.find();
    } catch (error) {
      requestTimeoutError();
    }
    return users;
  }

  public async createUser(createUserDTO: CreateUserDTO) {
    let userExists = undefined;
    try {
      userExists = await this.usersRepository.findOne({
        where: {
          email: createUserDTO.email
        }
      });
    } catch (error) {
      requestTimeoutError();
    }
    if (userExists)
      throw new BadRequestException('User with email already exists');

    let newUser = this.usersRepository.create(createUserDTO);
    try {
      await this.usersRepository.save(newUser);
    } catch (error) {
      requestTimeoutError();
    }
    return newUser;
  }
}
