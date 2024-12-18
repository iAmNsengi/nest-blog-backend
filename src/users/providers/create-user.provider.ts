import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    /** inject hashing provider */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    /** injecting mailService */
    private readonly mailService: MailService,
    /** injecting the datasource */
    private readonly dataSource: DataSource
  ) {}

  public async createUser(createUserDTO: CreateUserDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    let userExists = undefined;
    try {
      // connecting to the queryRunner
      await queryRunner.connect();

      // start the transaction
      await queryRunner.startTransaction();

      //check whether the user already exists
      userExists = await queryRunner.manager.findOne(User, {
        where: {
          email: createUserDTO.email
        }
      });

      if (userExists)
        throw new BadRequestException('User with email already exists');

      // use query manager to create a new user
      let newUser = queryRunner.manager.create(User, {
        ...createUserDTO,
        password: await this.hashingProvider.hashPassword(
          createUserDTO.password
        )
      });

      // save the created user
      await queryRunner.manager.save(newUser);

      // send a confirmation email
      await this.mailService.sendUserWelcome(newUser);

      // committing the transaction
      await queryRunner.commitTransaction();

      // return the created user
      return newUser;
    } catch (error) {
      // on any error rollback the transaction
      await queryRunner.rollbackTransaction();

      // log the error
      console.log(error);

      // throw an error
      throw new InternalServerErrorException(
        "Couldn't create the user at the moment, Try again later."
      );
    }
  }
}
