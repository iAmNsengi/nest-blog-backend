import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreatePostMetaOptionsDTO } from './dtos/create-post-meta-options.dto';
import { postStatus } from './enums/post-status.enum';
import { postType } from './enums/post-type.enum';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 96, nullable: false })
  title: string;

  @Column()
  postType: postType;

  @Column({ type: 'varchar', length: 96, nullable: false })
  slug: string;

  @Column()
  status: postStatus;

  @Column({ type: 'string', nullable: false })
  content: string;

  @Column({ type: 'string' })
  schema: string;

  @Column({ type: 'varchar', nullable: true })
  featuredImageUrl?: string;

  @Column({ type: 'date', nullable: true })
  publishedOn: Date;

  @Column()
  tags: string[];

  @Column()
  metaOptions: [CreatePostMetaOptionsDTO];
}
