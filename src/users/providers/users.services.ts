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

  public async findOneById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User with given id was not found!',
        HttpStatus.BAD_REQUEST
      );
    return user;
  }

  public async findAll() {
    console.log(this.profileConfiguration.API_KEY);

    return await this.usersRepository.find();
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
      throw new RequestTimeoutException(
        "Couldn't process your request at the moment",
        { description: 'Error connecting to the database1' }
      );
    }
    if (userExists)
      throw new BadRequestException('User with email already exists');

    const newUser = this.usersRepository.create(createUserDTO);

    return await this.usersRepository.save(newUser);
  }
}
