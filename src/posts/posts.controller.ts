import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dtos';
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

  @Get('user/:email')
  async getAllUserPosts(@Param('email') email: string) {
    return await this.postsService.getAllUserPosts(email);
  };

  @Patch(':id')
  async update(@Param('id') postId: string, @Body() dto: UpdatePostDto) {
    return await this.postsService.update(parseInt(postId), dto);
  };

  @Delete(':id')
  async delete(@Param('id') postId: string) {
    return await this.postsService.delete(parseInt(postId));
  };

};
