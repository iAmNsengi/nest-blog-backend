import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from './dtos/create-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { create } from 'domain';

@Injectable()
export class PostsService {
  constructor(
    /** Injecting the postRepository */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>
  ) {}
  public async createPost(createPostDTO: CreatePostDTO) {
    const postExist = await this.postRepository.findOne({
      where: { slug: createPostDTO.slug }
    });
    if (postExist)
      throw new HttpException(
        'Post with given title already exists',
        HttpStatus.BAD_REQUEST
      );
    const metaOptions = createPostDTO.metaOptions
      ? this.metaOptionsRepository.create(createPostDTO.metaOptions)
      : null;

    if (metaOptions) await this.metaOptionsRepository.save(metaOptions);

    const post = this.postRepository.create({
      ...createPostDTO,
      tags: createPostDTO.tags ? createPostDTO.tags.join(', ') : '',
      metaOptions
    });
    return await this.postRepository.save(post);
  }

  public async getAll() {
    return await this.postRepository.find();
  }

  public async getPostById(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (post) return post;
    return new HttpException(
      'Post with given ID was not found',
      HttpStatus.NOT_FOUND
    );
  }
}
