import { Injectable } from '@nestjs/common';
import { CreateTagDTO } from './dtos/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>
  ) {}

  public async getAllTags() {
    return await this.tagsRepository.find();
  }

  public async createTag(createTagDTO: CreateTagDTO) {
    const newTag = this.tagsRepository.create(createTagDTO);
    return await this.tagsRepository.save(newTag);
  }
}
