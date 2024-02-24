import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @ApiOperation({ description: 'Create a new Blop post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post()
  public createPost(@Body() createPostDTO: CreatePostDTO) {
    return this.postService.createPost(createPostDTO);
  }
}
