import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from './dtos/create-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { create } from 'domain';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/providers/users.services';

@Injectable()
export class PostsService {
  constructor(
    /** Injecting the postRepository */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,

    private readonly usersService: UsersService
  ) {}

  public async createPost(createPostDTO: CreatePostDTO) {
    const postExist = await this.postRepository.findOne({
      where: { slug: createPostDTO.slug }
    });

    if (postExist)
      throw new HttpException(
        'Post with given title already exists',
        HttpStatus.CONFLICT
      );
    const author = await this.usersService.findOneById(createPostDTO.authorId);

    const post = this.postRepository.create({
      ...createPostDTO,
      author,
      tags: createPostDTO.tags.join(', ') ?? ''
    });
    return await this.postRepository.save(post);
  }

  public async getAll() {
    return await this.postRepository.find({ relations: { metaOptions: true } });
  }

  public async getPostById(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (post) return post;
    return new HttpException(
      'Post with given ID was not found',
      HttpStatus.BAD_REQUEST
    );
  }

  public async delete(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post)
      throw new HttpException(
        'Post with given id was not found',
        HttpStatus.BAD_REQUEST
      );
    await this.postRepository.delete(id);
    return { deleted: true, id: post.id };
  }
}
