import { UserEntity } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

};