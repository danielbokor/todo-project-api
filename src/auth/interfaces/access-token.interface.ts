import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export class AccessTokenInterface {
  @Field()
  accessToken: string;
}
