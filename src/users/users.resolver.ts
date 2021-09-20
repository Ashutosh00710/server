import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/users.entity';
import { Ctx } from './interfaces/context';
import { UserService } from './users.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  register(@Args('user') user: CreateUserInput) {
    return this.userService.createUser(user);
  }

  @Query(() => User, { nullable: true })
  login(@Args('user') user: LoginInput, @Context() context: Ctx) {
    return this.userService.login(user, context);
  }

  @Query(() => User, { nullable: true })
  me(@Context() context: Ctx) {
    return context.req.user;
  }

  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  user(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('user') user: UpdateUserInput,
  ) {
    return this.userService.update(id, user);
  }

  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.delete(id);
  }
}
