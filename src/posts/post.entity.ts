import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { postStatus } from './enums/post-status.enum';
import { postType } from './enums/post-type.enum';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

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
  content?: string;

  @Column({ type: 'text', nullable: true })
  schema?: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  featuredImageUrl?: string;

  @Column({ type: 'timestamp', nullable: true })
  publishedOn?: Date;

  // create a one to one relationship to metaoption entity
  @OneToOne(() => MetaOption, (metaoption) => metaoption.post, {
    cascade: true,
    eager: true
  })
  metaOptions?: MetaOption;

  @ManyToMany(() => Tag, (tag) => tag.id, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
