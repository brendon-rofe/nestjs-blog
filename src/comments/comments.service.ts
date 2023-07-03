import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {

  constructor(@InjectRepository(CommentEntity) private commentRepo: Repository<CommentEntity>) {};

  async create() {};

  async getById() {};

  async update() {};

  async delete() {};

};
