import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDTO } from './dtos/create-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  public getAllPosts() {
    return 'Get post request';
  }

  @Get(':/id')
  public getPost() {
    return 'Get single post';
  }

  @Post()
  public createPost(@Body() createPostDTO: CreatePostDTO) {
    return 'Create Post end point';
  }
}
