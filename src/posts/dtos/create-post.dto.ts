import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested
} from 'class-validator';
import { postType } from '../enums/post-type.enum';
import { postStatus } from '../enums/post-status.enum';
import { CreatePostMetaOptionsDTO } from './create-post-meta-options.dto';
import { Type } from 'class-transformer';

export class CreatePostDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  title: string;

  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example : "my-url".'
  })
  slug: string;

  @IsEnum(postStatus)
  status: postStatus;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsJSON()
  @IsNotEmpty()
  schema?: string;

  @IsOptional()
  @IsUrl()
  featuredImageUrl?: string;

  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDTO)
  metaOptions: [CreatePostMetaOptionsDTO];
}
