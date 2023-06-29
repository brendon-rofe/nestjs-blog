import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {

  constructor(private postsService: PostsService) {};

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Request() req, @Body() dto: CreatePostDto) {
    return await this.postsService.create(req.user, dto);
  };

  @Get(':id')
  async getById(@Param('id') postId: string) {
    return await this.postsService.getById(parseInt(postId));
  };

};
