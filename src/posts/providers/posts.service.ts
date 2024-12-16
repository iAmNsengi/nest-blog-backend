import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from '../dtos/create-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { UsersService } from 'src/users/providers/users.services';
import { PatchPostDTO } from '../dtos/patch-post.dto';
import requestTimeoutError from 'src/errors/RequestTimeout';
import { TagsService } from 'src/tags/providers/tags.service';
import { PaginationQueryDTO } from 'src/common/pagination/dtos/pagination-query.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { create } from 'domain';

@Injectable()
export class PostsService {
  constructor(
    /** Injecting the postRepository */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    /** Injecting pagination provider */
    private readonly paginationProvider: PaginationProvider
  ) {}

  public async createPost(createPostDTO: CreatePostDTO) {
    return;
  }

  /** Get all posts */

  public async getAll(postQuery: PaginationQueryDTO) {
    let posts = undefined;
    try {
      posts = await this.paginationProvider.paginateQuery(
        {
          limit: postQuery.limit,
          page: postQuery.page
        },
        this.postRepository
      );
    } catch (error) {
      requestTimeoutError();
    }
    return posts;
  }

  /** Find all posts with an id */

  public async findAll(userId: number) {
    let posts = undefined;
    try {
      posts = await this.postRepository.find({ where: { id: userId } });
    } catch (error) {
      requestTimeoutError();
    }
    return posts;
  }

  /** Get post by id */

  public async getPostById(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (post) return post;
    return new ConflictException('Post with given ID was not found');
  }

  /** Update a post */

  public async updatePost(patchPostDTO: PatchPostDTO) {
    const post = await this.postRepository.findOneBy({ id: patchPostDTO.id });

    if (patchPostDTO.tags) {
      const tags = await this.tagsService.findMultipleTags(patchPostDTO.tags);
      post.tags = tags;
    }
    if (patchPostDTO.slug) {
      const slugExist = await this.postRepository.findOneBy({
        slug: patchPostDTO.slug
      });
      if (slugExist)
        throw new ConflictException('Post with provided slug already exists');
      post.slug = patchPostDTO.slug ?? post.slug;
    }

    post.title = patchPostDTO.title ?? post.title;
    post.content = patchPostDTO.content ?? post.content;
    post.featuredImageUrl =
      patchPostDTO.featuredImageUrl ?? post.featuredImageUrl;
    post.postType = patchPostDTO.postType ?? post.postType;
    post.status = patchPostDTO.status ?? post.status;
    post.schema = patchPostDTO.schema ?? post.schema;

    return await this.postRepository.save(post);
  }

  public async delete(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post with given id was not found');
    await this.postRepository.delete(id);
    return { deleted: true, id: post.id };
  }
}
