import { InterfaceType, Field, ID } from '@nestjs/graphql';

@InterfaceType()
export abstract class UserInterface {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;
}
