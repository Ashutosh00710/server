import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(@Body() post: CreatePostDto) {
    return this.postService.create({
      ...post,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  @Get(':id')
  getPost(@Param() param: { id: string }) {
    return this.postService.findOne(param.id);
  }

  @Get()
  getAllPosts() {
    return this.postService.findAll();
  }

  @Patch('/:id')
  updatePost(@Param() param: { id: string }, @Body() post: CreatePostDto) {
    return this.postService.update(param.id, {
      ...post,
      updatedAt: new Date(),
    });
  }

  @Delete('/:id')
  deletePost(@Param() param: { id: string }) {
    return this.postService.delete(param.id);
  }
}
