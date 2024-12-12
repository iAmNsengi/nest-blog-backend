import { IsDate, IsOptional } from 'class-validator';

export class GetPostsBaseDTO {
  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate: Date;
}
