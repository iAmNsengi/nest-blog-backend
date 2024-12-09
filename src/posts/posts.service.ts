import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from './dtos/create-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { UsersService } from 'src/users/providers/users.services';
import { TagsService } from 'src/tags/tags.service';
import { PatchPostDTO } from './dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    /** Injecting the postRepository */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,

    private readonly usersService: UsersService,

    private readonly tagsService: TagsService
  ) {}

  public async createPost(createPostDTO: CreatePostDTO) {
    const postExist = await this.postRepository.findOne({
      where: { slug: createPostDTO.slug }
    });

    if (postExist)
      throw new ConflictException('Post with given title already exists');
    const author = await this.usersService.findOneById(createPostDTO.authorId);
    const tags = await this.tagsService.findMultipleTags(createPostDTO.tags);

    const post = this.postRepository.create({
      ...createPostDTO,
      author,
      tags
    });

    return await this.postRepository.save(post);
  }

  public async getAll() {
    return await this.postRepository.find({
      relations: { metaOptions: true, author: true, tags: true }
    });
  }

  public async getPostById(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (post) return post;
    return new ConflictException('Post with given ID was not found');
  }
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
