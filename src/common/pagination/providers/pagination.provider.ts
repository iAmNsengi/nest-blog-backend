import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDTO } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import requestTimeoutError from 'src/errors/RequestTimeout';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    /** Injecting the request from express */
    @Inject(REQUEST)
    private readonly request: Request
  ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginateQuery: PaginationQueryDTO,
    repository: Repository<T>
  ): Promise<Paginated<T>> {
    let results = undefined;
    try {
      results = await repository.find({
        take: paginateQuery.limit,
        skip: (paginateQuery.page - 1) * paginateQuery.limit
      });
    } catch (error) {
      requestTimeoutError();
    }

    /** Creating the request URLS */
    const baseURL =
      this.request.protocol + '://' + this.request.headers.host + '/';

    // create a URL object with entire properties of a URL
    const newUrl = new URL(this.request.url, baseURL);

    /** calculate the page number */
    const totalItems = await repository.count();
    // round up to highest int possible
    const totalPages = Math.ceil(totalItems / paginateQuery.limit);
    // check if we are on the last page else add another page
    const nextPage =
      paginateQuery.page === totalPages
        ? paginateQuery.page
        : paginateQuery.page + 1;
    // check if we are on the first page else prev page is current page -1
    const previousPage =
      paginateQuery.page === 1 ? paginateQuery.page : paginateQuery.page - 1;

    // the response object we want
    const finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginateQuery.limit,
        totalItems: totalItems,
        currentPage: paginateQuery.page,
        totalPages: totalPages
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${paginateQuery.page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${previousPage}`
      }
    };

    return finalResponse;
  }
}
