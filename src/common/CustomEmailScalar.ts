import { BadRequestException } from '@nestjs/common';
import { GraphQLScalarType } from 'graphql';

const regex = /[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,63}$/i;

function validate(email: unknown): string | never {
  if (typeof email !== 'string' || !regex.test(email)) {
    throw new BadRequestException('invalid email field');
  }
  return email;
}

export const CustomEmailScalar = new GraphQLScalarType({
  name: 'Email',
  description: 'A simple email field parser',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
});
