import {
  HttpException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async createManyUsers(createUsersDTO: CreateUserDTO[]) {
    let newUsers: User[] = [];
    // create a query runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    // connect query runner to our data source
    await queryRunner.connect();

    // start transaction
    try {
      await queryRunner.startTransaction();
    } catch (error) {
      throw new InternalServerErrorException("Couldn't start transaction");
    }

    try {
      for (let user of createUsersDTO) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);

        // if successful commit the transaction
        let trans = await queryRunner.commitTransaction();
        console.log(trans);
      }
    } catch (error) {
      //    unsuccessful rollback
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      // release back the connection
      await queryRunner.release();
    }
    console.log(newUsers);

    return newUsers;
  }
}
