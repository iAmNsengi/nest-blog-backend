import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { CreatePostMetaOptionsDTO } from './dtos/create-post-meta-options.dto';
import { MetaOptionsService } from './providers/meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(
    /** Inject metaOption service*/
    public readonly metaOptionService: MetaOptionsService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all meta options' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved meta options'
  })
  @ApiResponse({
    status: 400,
    description: 'A bad request was detected'
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error occured'
  })
  public getAll() {
    return 'This is the get all endpoint';
  }

  @Post()
  @ApiOperation({ summary: 'Create a new meta option' })
  @ApiResponse({
    status: 201,
    description: 'New Meta Option created successfully!'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request'
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error was detected!'
  })
  public createMetaOption(
    @Body() createMetaOptionDTO: CreatePostMetaOptionsDTO
  ) {
    return this.metaOptionService.create(createMetaOptionDTO);
  }
}
