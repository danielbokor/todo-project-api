import { BadRequestException } from '@nestjs/common';
import { BADFAMILY } from 'dns';
import { GraphQLScalarType } from 'graphql';

function validate(password: unknown): string | never {
  if (typeof password !== 'string') {
    throw new BadRequestException('Invalid type for password');
  }

  if (password.length < 6) {
    throw new BadRequestException('Password too short');
  }

  return password;
}

export const CustomPasswordScalar = new GraphQLScalarType({
  name: 'Password',
  description: 'A simple password field parser',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
});
