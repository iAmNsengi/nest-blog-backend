import { Injectable } from '@nestjs/common';
import { PaginationQueryDTO } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import requestTimeoutError from 'src/errors/RequestTimeout';

@Injectable()
export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral>(
    paginateQuery: PaginationQueryDTO,
    repository: Repository<T>
  ) {
    let results = undefined;
    try {
      results = await repository.find({
        take: paginateQuery.limit,
        skip: (paginateQuery.page - 1) * paginateQuery.limit
      });
    } catch (error) {
      requestTimeoutError();
    }
    return results;
  }
}
