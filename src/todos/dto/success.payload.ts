import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'success payload' })
export class SuccessPayload {
  @Field()
  success: boolean;
}
