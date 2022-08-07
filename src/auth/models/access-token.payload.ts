import { Field, ObjectType } from '@nestjs/graphql';
import { AccessTokenInterface } from '../interfaces/access-token.interface';

@ObjectType()
export class AccessTokenPayload implements AccessTokenInterface {
  @Field()
  accessToken: string;
}
