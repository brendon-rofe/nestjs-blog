import { CommentEntity } from "src/comments/comment.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('posts')
export class PostEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ default: false })
  movedToTrash: boolean;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @Column()
  author: string;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

};