import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
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

};
