import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDTO } from '../dtos/create-many-user.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async createManyUsers(createManyUsersDTO: CreateManyUsersDTO) {
    let newUsers: User[] = [];
    // create a query runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      // connect query runner to our data source
      await queryRunner.connect();
      // start transaction

      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException(
        "Couldn't connect to the database right now, try again later"
      );
    }

    try {
      for (let user of createManyUsersDTO.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      // if successful commit the transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      //    unsuccessful rollback
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      // release back the connection
      await queryRunner.release();
    }
    return newUsers;
  }
}
