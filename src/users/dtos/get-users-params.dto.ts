import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUsersParamDTO {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id: number;
}
