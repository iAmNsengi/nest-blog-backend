import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dtos/create-user.dto';
import requestTimeoutError from 'src/errors/RequestTimeout';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDTO } from '../dtos/create-many-user.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';

/**
 * Class to connect to users table and perform business logics
 */
@Injectable()
export class UsersService {
  /** Constructor */
  constructor(
    /** injecting the usersrepository */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    /** Injecting user  create many provider */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    /** injecting createuser provider */
    private readonly createUserProvider: CreateUserProvider,
    /** injecting the findOneUseByEmail provider */
    private readonly findOneUserByEmail: FindOneUserByEmailProvider,
    /** injecting the findOneByGoogleIdprovider */
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider
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
    if (!user)
      throw new NotFoundException(`User with id ${id} was not found!!`);

    return user;
  }

  public async createUser(createUserDTO: CreateUserDTO) {
    return this.createUserProvider.createUser(createUserDTO);
  }

  public async createMany(createManyUsersDTO: CreateManyUsersDTO) {
    return await this.usersCreateManyProvider.createManyUsers(
      createManyUsersDTO
    );
  }

  public async findOneByEmail(email: string): Promise<User> {
    return await this.findOneUserByEmail.findOneByEmail(email);
  }

  public async findOneByUserGoogleId(googleId: string): Promise<User> {
    return await this.findOneByGoogleIdProvider.findUserByGoogleId(googleId);
  }
}
