import { Injectable } from '@nestjs/common';
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
    return await this.postRepository.find({ where: { id } });
  }
}
