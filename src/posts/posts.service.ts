import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    /** Injecting the postRepository */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}
  public createPost(body: any) {
    return body;
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
