import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDTO } from './dtos/create-post.dto';
import { PatchPostDTO } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Posts retrieved successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  public getAllPosts() {
    return this.postService.getAll();
  }

  @ApiOperation({ summary: 'Get post by ID' })
  @ApiResponse({ status: 200, description: 'Post retrieved successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get(':id')
  public getPost(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ) {
    return this.postService.getPostById(id);
  }

  @ApiOperation({ summary: 'Create a new Blog post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 403,
    description:
      'A conflict occured, passed data are conflicting with existing ones.'
  })
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

  @ApiOperation({ summary: 'Delete post by id' })
  @Delete()
  public deletePost(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ) {
    return this.postService.delete(id);
  }
}
