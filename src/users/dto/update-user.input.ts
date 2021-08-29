import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  firstname?: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Length(8, 15)
  @Field(() => String, { nullable: true })
  password?: string;
}
