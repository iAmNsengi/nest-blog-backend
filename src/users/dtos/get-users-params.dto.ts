import { IsInt, IsOptional } from 'class-validator';

export class GetUsersParamDTO {
  @IsOptional()
  @IsInt()
  id: number;
}
