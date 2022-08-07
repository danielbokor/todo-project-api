import { Resolver, Query, Args } from '@nestjs/graphql';
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
}
