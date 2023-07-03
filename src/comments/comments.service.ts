import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dtos';

@Injectable()
export class CommentsService {

  constructor(@InjectRepository(CommentEntity) private commentRepo: Repository<CommentEntity>) {};

  async create(dto: CreateCommentDto) {
    const newComment = new CommentEntity();
    newComment.content = dto.content;
    return await this.commentRepo.save(newComment);
  };

  async getById(commentId: number) {
    const comment = await this.commentRepo.findOneBy({ id: commentId });
    if(!comment) {
      throw new HttpException(`Comment with ID:${commentId} not found`, HttpStatus. NOT_FOUND);
    };
    return comment;
  };

  async update() {};

  async delete() {};

};
