import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserModel } from './models/user.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => UserModel)
  async user(@Args('id') id: string) {
    return this.usersService.getById(id);
  }

  @Query((returns) => [UserModel])
  async users() {
    return this.usersService.findAll();
  }

  @Mutation((returns) => UserModel)
  async signUp(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    console.log(name, email, password);

    return this.usersService.getById('123');
  }

  @Mutation((returns) => UserModel)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    console.log(email, password);

    return this.usersService.getById('123');
  }
}
