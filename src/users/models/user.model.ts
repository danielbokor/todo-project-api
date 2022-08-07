import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CustomEmailScalar } from '../../common/CustomEmailScalar';
import { CustomPasswordScalar } from '../../common/CustomPasswordScalar';
import { UserWithPasswordInterface } from '../interfaces/user-with-password.interface';

@ObjectType({ description: 'user' })
export class UserModel implements UserWithPasswordInterface {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field((type) => CustomEmailScalar)
  email: string;

  @Field((type) => CustomPasswordScalar)
  password: string;
}
