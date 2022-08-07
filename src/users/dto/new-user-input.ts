import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
