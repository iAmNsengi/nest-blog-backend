import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreatePostMetaOptionsDTO {
  @ApiProperty({ example: '{\"sidebarEnabled\":true}' })
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
