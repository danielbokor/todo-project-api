import { Field, ObjectType } from '@nestjs/graphql';
import { AccessTokenInterface } from '../interfaces/access-token.interface';

@ObjectType({ description: 'access token payload' })
export class AccessTokenPayload implements AccessTokenInterface {
  @Field()
  accessToken: string;
}
