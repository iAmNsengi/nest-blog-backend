import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';

@Controller('meta-options')
export class MetaOptionsController {
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
  public createMetaOption() {
    return 'Create a new meta option';
  }
}
