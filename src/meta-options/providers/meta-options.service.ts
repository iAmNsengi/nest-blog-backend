import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDTO } from '../dtos/create-post-meta-options.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetaOptionsService {
  constructor(
    /**
     * Injecting meta options repository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>
  ) {}

  public async create(createPostMetaOptionsDTO: CreatePostMetaOptionsDTO) {
    const metaOption = this.metaOptionsRepository.create(
      createPostMetaOptionsDTO
    );
    return await this.metaOptionsRepository.save(metaOption);
  }
}
