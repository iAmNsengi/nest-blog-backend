import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreatePostMetaOptionsDTO } from '../meta-options/dtos/create-post-meta-options.dto';
import { postStatus } from './enums/post-status.enum';
import { postType } from './enums/post-type.enum';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 512, nullable: false })
  title: string;

  @Column({
    type: 'enum',
    enum: postType,
    nullable: false,
    default: postType.POST
  })
  postType: postType;

  @Column({ type: 'varchar', length: 256, nullable: false, unique: true })
  slug: string;

  @Column({
    type: 'enum',
    enum: postStatus,
    nullable: false,
    default: postStatus.DRAFT
  })
  status: postStatus;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'text', nullable: true })
  schema: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  featuredImageUrl?: string;

  @Column({ type: 'timestamp', nullable: true })
  publishedOn: Date;

  @Column()
  tags: string[];

  @Column()
  metaOptions: [CreatePostMetaOptionsDTO];
}
