import { IsNotEmpty, IsString } from 'class-validator';
import { postType } from '../enums/post-type.enum';
import { postStatus } from '../enums/post-status.enum';

export class CreatePostDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  postType: postType;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  status: postStatus;

  @IsString()
  content?: string;

  schema?: string;

  featuredImageUrl?: string;

  publishOn: Date;

  tags: string[];

  metaOptions: [{ key: 'sidebarEnabled'; value: true }];
}
