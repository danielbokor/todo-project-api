import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserInterface } from './interfaces/user.interface';
import { UserModel } from './models/user.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => UserModel)
  async user(@Args('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Query((returns) => [UserModel])
  async users() {
    return this.usersService.findAll();
  }
}
