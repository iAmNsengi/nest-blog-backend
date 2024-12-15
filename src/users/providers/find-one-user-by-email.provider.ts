import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import requestTimeoutError from 'src/errors/RequestTimeout';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    /** injecting the users repository */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  public async findOneByEmail(email: string): Promise<User> {
    let user: User | undefined = undefined;
    try {
      user = await this.usersRepository.findOneBy({ email });
    } catch (error) {
      requestTimeoutError();
    }
    if (!user)
      throw new UnauthorizedException('User with email was not found!');

    return user;
  }
}
