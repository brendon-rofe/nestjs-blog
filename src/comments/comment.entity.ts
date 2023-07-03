import { PostEntity } from "src/posts/post.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('comments')
export class CommentEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => PostEntity, { onDelete: 'CASCADE' })
  post: PostEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

};
