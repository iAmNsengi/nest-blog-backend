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
    @Param() getUserParamDTO?: GetUsersParamDTO,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number
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
