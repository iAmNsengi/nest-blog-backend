import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTagDTO } from './dtos/create-tag.dto';
import { TagsService } from './tags.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  public getAllTags() {
    return this.tagService.getAllTags();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new tag' })
  public createTag(@Body() createTagDTO: CreateTagDTO) {
    return this.tagService.createTag(createTagDTO);
  }
}
