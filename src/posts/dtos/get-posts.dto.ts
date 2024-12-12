import { IntersectionType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDTO } from 'src/common/pagination/dtos/pagination-query.dto';

class GetPostsBaseDTO {
  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate: Date;
}

export class GetPostDTO extends IntersectionType(
  GetPostsBaseDTO,
  PaginationQueryDTO
) {}
