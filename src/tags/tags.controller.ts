import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query
} from '@nestjs/common';
import { CreateTagDTO } from './dtos/create-tag.dto';
import { ApiOperation } from '@nestjs/swagger';
import { TagsService } from './providers/tags.service';

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

  @Delete()
  @ApiOperation({ summary: 'Delete a post by id' })
  public deleteTag(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ) {
    return this.tagService.deleteTag(id);
  }

  @Delete('soft-delete')
  public async softDelete(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ) {
    return this.tagService.softRemove(id);
  }
}
