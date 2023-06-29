import { Injectable } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dtos';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity) private postsRepo: Repository<PostEntity>,
    private userService: UserService,
  ) {};

  async create(user: UserEntity, dto: CreatePostDto) {
    const foundUser = await this.userService.getByEmail(user.email);
    const newPost = new PostEntity();
    newPost.title = dto.title;
    newPost.content = dto.content;
    newPost.user = foundUser;
    newPost.author = `${foundUser.firstName} ${foundUser.lastName}`;
    return await this.postsRepo.save(newPost);
  };
}
