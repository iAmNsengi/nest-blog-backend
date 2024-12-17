import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable
} from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { CreateManyUsersDTO } from '../dtos/create-many-user.dto';
import requestTimeoutError from 'src/errors/RequestTimeout';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { create } from 'domain';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    /** inject users repository */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    /** Injecting user  create many provider */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    /** inject hashing provider */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    /** injecting mailService */
    private readonly mailService: MailService
  ) {}

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

    let newUser = this.usersRepository.create({
      ...createUserDTO,
      password: await this.hashingProvider.hashPassword(createUserDTO.password)
    });
    try {
      await this.usersRepository.save(newUser);
    } catch (error) {
      requestTimeoutError();
    }
    try {
      await this.mailService.sendUserWelcome(newUser);
    } catch (error) {
      requestTimeoutError();
    }
    return newUser;
  }
}
