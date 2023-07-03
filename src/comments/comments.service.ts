import { Injectable } from '@nestjs/common';
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

  async getById() {};

  async update() {};

  async delete() {};

};
