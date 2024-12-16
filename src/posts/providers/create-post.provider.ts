import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { CreatePostDTO } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.services';
import { TagsService } from 'src/tags/providers/tags.service';
import { ActiveUserInterface } from 'src/auth/interfaces/active-user-interface';

@Injectable()
export class CreatePostProvider {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService
  ) {}

  public async createPost(
    createPostDTO: CreatePostDTO,
    user: ActiveUserInterface
  ) {
    // Check for existing post with the same slug
    const postExist = await this.postRepository.findOne({
      where: { slug: createPostDTO.slug }
    });

    if (postExist)
      throw new ConflictException('Post with given slug already exists');

    // Verify author exists
    const author = await this.usersService.findOneById(user.sub);

    if (!author)
      throw new NotFoundException(
        `Author with ID ${createPostDTO.authorId} was not found in our records!!`
      );

    // Resolve tags
    let tags = [];
    if (createPostDTO.tags && createPostDTO.tags.length > 0) {
      tags = await this.tagsService.findMultipleTags(createPostDTO.tags);

      // Optional: Throw error if no tags found
      if (createPostDTO.tags.length > 0 && tags.length === 0)
        throw new NotFoundException('No valid tags found');
    }

    // Create post with explicit author and tags
    const post = this.postRepository.create({
      ...createPostDTO,
      author,
      tags // Set resolved tags
    });

    try {
      return await this.postRepository.save(post);
    } catch (error) {
      console.error('Error saving post:', error);
      throw new InternalServerErrorException('Failed to create post');
    }
  }
}
