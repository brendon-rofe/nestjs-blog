import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto, UpdateCommentDto } from './dtos';
import { PostEntity } from 'src/posts/post.entity';
import { PostsService } from 'src/posts/posts.service';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(CommentEntity) private commentRepo: Repository<CommentEntity>, 
    private postsService: PostsService,
    private userService: UserService
  ) {};

  async create(user: UserEntity, postId: number, dto: CreateCommentDto) {
    const post: PostEntity = await this.postsService.getById(postId);
    const foundUser = await this.userService.getByEmail(user.email);
    const newComment = new CommentEntity();
    newComment.content = dto.content;
    newComment.post = post;
    newComment.user = foundUser;
    return await this.commentRepo.save(newComment);
  };

  async getById(commentId: number) {
    const comment = await this.commentRepo.findOneBy({ id: commentId });
    if(!comment) {
      throw new HttpException(`Comment with ID: ${commentId} not found`, HttpStatus. NOT_FOUND);
    };
    return comment;
  };

  async update(commentId: number, dto: UpdateCommentDto) {
    const comment = await this.commentRepo.findOneBy({ id: commentId });
    comment.content = dto.content;
    await this.commentRepo.save(comment);
    return comment;
  };

  async delete(commentId: number) {
    await this.getById(commentId);
    await this.commentRepo.delete({ id: commentId });
    return { message: `Comment with ID: ${commentId} deleted` };
  };

};
