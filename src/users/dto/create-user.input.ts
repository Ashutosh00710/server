import { InputType, Field } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  firstname: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Length(8, 15)
  @Field(() => String)
  password: string;
}
