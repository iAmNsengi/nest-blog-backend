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
  MaxLength,
  MinLength,
  ValidateNested
} from 'class-validator';
import { postType } from '../enums/post-type.enum';
import { postStatus } from '../enums/post-status.enum';
import { CreatePostMetaOptionsDTO } from '../../meta-options/dtos/create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDTO {
  @ApiProperty({
    description: 'This is the title of the post',
    example: 'How Nsengi became a developer'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  title: string;

  @ApiProperty({
    description: 'Possible values: "post", "page","series"',
    example: 'post'
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: 'Slug of the post',
    example: 'how-nsengi-became-a-developer'
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example : "my-url".'
  })
  @MaxLength(256)
  slug: string;

  @ApiProperty()
  @IsEnum(postStatus)
  status: postStatus;

  @ApiPropertyOptional({
    description: 'This is the post content',
    example: 'Nsengi was born at a very youn age!'
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation  error will be thrown',
    example: '{\"@context\": \"https://schema.org\", \"@type\": \"Person\"}'
  })
  @IsString()
  @IsJSON()
  @IsNotEmpty()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Add your featured image URL',
    example: 'https://examples.com/img/img1.png'
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'The date on which the blog post is published',
    example: '2024-12-23T07:46:32+0000'
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  @ApiPropertyOptional({
    description: 'An array of tags passed as string values',
    example: ['nestjs', 'programming']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags: string[];

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'string',
          description: 'The meta value is a JSON string',
          example: '{"sidebarEnabled":true}'
        }
      }
    }
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDTO)
  metaOptions?: CreatePostMetaOptionsDTO | null;
}
