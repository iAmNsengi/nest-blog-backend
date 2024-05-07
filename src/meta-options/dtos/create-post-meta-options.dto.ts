import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreatePostMetaOptionsDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
