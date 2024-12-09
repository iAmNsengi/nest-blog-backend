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

    const newUser = this.usersRepository.create(createUserDTO);

    return await this.usersRepository.save(newUser);
  }
}
