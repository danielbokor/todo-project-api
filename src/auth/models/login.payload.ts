import { Field, ObjectType } from '@nestjs/graphql';
import { AccessTokenInterface } from '../interfaces/access-token.interface';
import { RefreshTokenInterface } from '../interfaces/refresh-token.interface';

@ObjectType({ description: 'login payload' })
export class LoginPayload
  implements AccessTokenInterface, RefreshTokenInterface
{
  @Field({
    description: 'The auth token of an user.',
  })
  accessToken: string;

  @Field({
    description: 'The refresh token of an user.',
  })
  refreshToken: string;
}
