import { Injectable } from '@nestjs/common';
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

    return newUsers;
  }
}
