import {
  DefaultValuePipe,
  Injectable,
  Param,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { GetUsersParamDTO } from '../dtos/get-users-params.dto';

@Injectable()
export class UsersService {
  public findAll(
    getUserParamDTO: GetUsersParamDTO,
    limit: number,
    page: number
  ) {
    console.log(getUserParamDTO);

    return [
      {
        firstName: 'John',
        email: 'john@gmail.com'
      },
      {
        firstName: 'Karera',
        email: 'karera@gmail.com'
      },
      {
        firstName: 'Johnson',
        email: 'johnson@gmail.com'
      }
    ];
  }
}
