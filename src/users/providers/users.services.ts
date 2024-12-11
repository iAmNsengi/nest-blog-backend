import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { GetUsersParamDTO } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/auth.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profileConfig';
import requestTimeoutError from 'src/errors/RequestTimeout';
import { query } from 'express';

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
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    /** Injecting data source */
    private readonly dataSource: DataSource
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
      user = await this.usersRepository.findBy({ id });
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

  public async createManyUsers(createUsersDTO: CreateUserDTO[]) {
    let newUsers: User[] = [];
    // create a query runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    // connect query runner to our data source
    await queryRunner.connect();
    // start transaction
    await queryRunner.startTransaction();

    try {
      for (let user of createUsersDTO) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
        // if successful commit the transaction
        await queryRunner.commitTransaction();
      }
    } catch (error) {
      // if transaction unsuccessful rollback
      await queryRunner.rollbackTransaction();
    } finally {
      // release back the connection
      await queryRunner.release();
    }
  }
}
