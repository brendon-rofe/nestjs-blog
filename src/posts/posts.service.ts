import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto, UpdatePostDto } from './dtos';
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

  async getById(postId: number) {
    const post = await this.postsRepo.findOne({ where: { id: postId }, relations: ['user', 'comments'] });
    if(!post) {
      throw new HttpException(`Post with ID: ${postId} not found`, HttpStatus.NOT_FOUND);
    };
    return post;
  };

  async update(postId: number, dto: UpdatePostDto) {
    const post = await this.getById(postId);
    post.title = dto.title;
    post.content = dto.content;
    return await this.postsRepo.save(post);
  };

  async delete(postId: number) {
    const post = await this.postsRepo.findOne({ where: { id: postId }, relations: ['user'] });
    if(!post) {
      throw new HttpException(`Post with ID: ${postId} not found`, HttpStatus.NOT_FOUND);
    };
    await this.postsRepo.delete({ id: postId });
  };

};
