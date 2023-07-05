import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { PostsModule } from 'src/posts/posts.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), PostsModule, UserModule],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {};
