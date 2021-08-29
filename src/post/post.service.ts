import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostInput): Promise<Post> {
    const createdPost = new this.postModel({
      ...createPostDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return createdPost.save();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id);
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async update(updatePost: UpdatePostInput): Promise<Post> {
    const { id, ...updatedPost } = updatePost;
    return this.postModel.findByIdAndUpdate(
      id,
      { ...updatedPost, updatedAt: new Date() },
      { new: true },
    );
  }

  async delete(id: string): Promise<Post> {
    return this.postModel.findByIdAndRemove(id);
  }
}
