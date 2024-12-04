import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  public createPost(body: any) {
    return body;
  }
}
