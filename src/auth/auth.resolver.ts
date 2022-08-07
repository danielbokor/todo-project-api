import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { stringify } from 'querystring';
import { UserModel } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AccessTokenPayload } from './models/access-token.payload';
import { LoginPayload } from './models/login.payload';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation((returns) => UserModel)
  async signUp(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.usersService.create({ name, email, password });
  }

  @Mutation((returns) => LoginPayload)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Mutation((returns) => AccessTokenPayload)
  async refreshAccessToken(@Args('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
