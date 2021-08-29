import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  firstname: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => String)
  username: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @Length(8, 15)
  @Field(() => String)
  password: string;
}
