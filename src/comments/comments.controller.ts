import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {

  constructor(private commentsService: CommentsService) {};

  @Post()
  async create() {};

  @Get()
  async getById() {};

  @Patch()
  async update() {};

  @Delete()
  async delete() {};

};
