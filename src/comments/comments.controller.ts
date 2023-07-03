import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos';

@Controller('comments')
export class CommentsController {

  constructor(private commentsService: CommentsService) {};

  @Post()
  async create(@Body() dto: CreateCommentDto ) {
    return await this.commentsService.create(dto);
  };

  @Get(':id')
  async getById(@Param('id') postId: string) {
    return await this.commentsService.getById(parseInt(postId));
  };

  @Patch()
  async update() {};

  @Delete()
  async delete() {};

};
