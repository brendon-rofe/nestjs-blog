import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dtos';

@Controller('comments')
export class CommentsController {

  constructor(private commentsService: CommentsService) {};

  @Post(':postId')
  async create(
    @Request() req,
    @Param('postId') postId: string, 
    @Body() dto: CreateCommentDto 
    ) {
    return await this.commentsService.create(req.user, parseInt(postId), dto);
  };

  @Get(':id')
  async getById(@Param('id') commentId: string) {
    return await this.commentsService.getById(parseInt(commentId));
  };

  @Patch(':id')
  async update(@Param('id') commentId: string, @Body() dto: UpdateCommentDto ) {
    return await this.commentsService.update(parseInt(commentId), dto);
  };

  @Delete(':id')
  async delete(@Param('id') commentId: string) {
    return await this.commentsService.delete(parseInt(commentId));
  };

};
