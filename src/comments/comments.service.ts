import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto, UpdateCommentDto } from './dtos';
import { PostEntity } from 'src/posts/post.entity';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(CommentEntity) private commentRepo: Repository<CommentEntity>, 
    private postsService: PostsService
  ) {};

  async create(postId: number, dto: CreateCommentDto) {
    const post: PostEntity = await this.postsService.getById(postId);
    const newComment = new CommentEntity();
    newComment.content = dto.content;
    newComment.post = post;
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
