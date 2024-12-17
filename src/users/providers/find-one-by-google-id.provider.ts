import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import requestTimeoutError from 'src/errors/RequestTimeout';

@Injectable()
export class FindOneByGoogleIdProvider {
  constructor(
    /**inject  user repository*/
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  public async findUserByGoogleId(googleId: string) {
    try {
      return await this.usersRepository.findOneBy({ googleId });
    } catch (error) {
      requestTimeoutError();
    }
  }
}
