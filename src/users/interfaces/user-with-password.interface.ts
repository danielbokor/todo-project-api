import { InterfaceType, Field } from '@nestjs/graphql';
import { UserInterface } from './user.interface';

@InterfaceType()
export abstract class UserWithPasswordInterface extends UserInterface {
  @Field()
  password: string;
}
