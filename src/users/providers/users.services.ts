import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dtos/create-user.dto';
import requestTimeoutError from 'src/errors/RequestTimeout';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDTO } from '../dtos/create-many-user.dto';

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

    /** Injecting user  create many provider */
    private readonly usersCreateManyProvider: UsersCreateManyProvider
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
    let user = undefined;
    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      requestTimeoutError();
    }
    if (!user) throw new NotFoundException(`User with id ${id} was not found!`);
    return user;
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

  public async createMany(createManyUsersDTO: CreateManyUsersDTO) {
    return await this.usersCreateManyProvider.createManyUsers(
      createManyUsersDTO
    );
  }
}
