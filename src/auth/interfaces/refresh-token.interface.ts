import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export class RefreshTokenInterface {
  @Field()
  refreshToken: string;
}
