import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDTO } from './dtos/create-post.dto';
import { PatchPostDTO } from './dtos/patch-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Posts retrieved successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  public getAllPosts() {
    return 'Get post request';
  }
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiResponse({ status: 200, description: 'Post retrieved successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get(':/id')
  public getPost() {
    return 'Get single post';
  }

  @ApiOperation({ summary: 'Create a new Blog post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post()
  public createPost(@Body() createPostDTO: CreatePostDTO) {
    return this.postService.createPost(createPostDTO);
  }

  @ApiOperation({ summary: 'Updates the content of a post' })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error occured' })
  @Patch()
  public updatePost(@Body() patchPostDTO: PatchPostDTO) {
    console.log('Patch post DTO');
    return patchPostDTO;
  }
}
