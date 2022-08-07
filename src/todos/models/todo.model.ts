import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../users/models/user.model';

@ObjectType({ description: 'todo' })
export class TodoModel {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  isCompleted: boolean;

  @Field((type) => UserModel)
  user: UserModel;
}
