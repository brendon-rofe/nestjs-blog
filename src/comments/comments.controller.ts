import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos';

@Controller('comments')
export class CommentsController {

  constructor(private commentsService: CommentsService) {};

  @Post()
  async create(@Body() dto: CreateCommentDto ) {
    return await this.commentsService.create(dto);
  };

  @Get()
  async getById() {};

  @Patch()
  async update() {};

  @Delete()
  async delete() {};

};
