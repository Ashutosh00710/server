import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id);
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async update(id: string, createCatDto: CreatePostDto): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, createCatDto, { new: true });
  }

  async delete(id: string): Promise<Post> {
    return this.postModel.findByIdAndRemove(id);
  }
}
