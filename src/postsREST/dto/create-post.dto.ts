import { InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostDto {
  title: string;
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
