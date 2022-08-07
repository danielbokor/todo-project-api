import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { CustomEmailScalar } from './common/CustomEmailScalar';
import { CustomPasswordScalar } from './common/CustomPasswordScalar';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      resolvers: { Email: CustomEmailScalar, Password: CustomPasswordScalar },
    }),
    AuthModule,
    TodosModule,
  ],
})
export class AppModule {}
