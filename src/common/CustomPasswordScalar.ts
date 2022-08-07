import { GraphQLScalarType } from 'graphql';

function validate(password: unknown): string | never {
  if (typeof password !== 'string') {
    throw new Error('Invalid password');
  }

  if (password.length < 6) {
    throw new Error('Password too short');
  }

  return password;
}

export const CustomPasswordScalar = new GraphQLScalarType({
  name: 'Password',
  description: 'A simple password field parser',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
});
