import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOptionsService } from 'src/meta-options/providers/meta-options.service';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostsController],
  imports: [TypeOrmModule.forFeature([Post]), MetaOptionsModule, UsersModule],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
