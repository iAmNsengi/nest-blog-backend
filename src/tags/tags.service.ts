import { Injectable } from '@nestjs/common';
import { CreateTagDTO } from './dtos/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>
  ) {}

  public async getAllTags() {
    return await this.tagsRepository.find();
  }

  public async findMultipleTags(tags: number[]) {
    const tagsFound = await this.tagsRepository.find({
      where: {
        id: In(tags)
      }
    });
    return tagsFound;
  }

  public async createTag(createTagDTO: CreateTagDTO) {
    const newTag = this.tagsRepository.create(createTagDTO);
    return await this.tagsRepository.save(newTag);
  }
}
