import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserWithPasswordInterface } from '../interfaces/user-with-password.interface';

@ObjectType({ description: 'user' })
export class UserModel implements UserWithPasswordInterface {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
