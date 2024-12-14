import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOptionsService } from 'src/meta-options/providers/meta-options.service';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
import { UsersModule } from 'src/users/users.module';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [PostsController],
  imports: [
    TypeOrmModule.forFeature([Post]),
    MetaOptionsModule,
    UsersModule,
    TagsModule,
    PaginationModule
  ],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
