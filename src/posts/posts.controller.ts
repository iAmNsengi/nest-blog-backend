import { Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

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
  public createPost() {
    return 'Create Post end point';
  }
}
