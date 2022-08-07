import { Request, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TodoModel } from './models/todo.model';
import { TodosService } from './todos.service';

@UseGuards(JwtAuthGuard)
@Resolver()
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query((returns) => [TodoModel])
  async listTodos(@Context() context: any) {
    const { id: userId } = context.req.user;
    return this.todosService.findAll();
  }

  @Mutation((returns) => TodoModel)
  async createTodo(
    @Args('title') title: string,
    @Args('isCompleted') isCompleted: boolean,
    @Context() context: any,
  ) {
    const { id: userId } = context.req.user;
    return this.todosService.create(title, isCompleted, userId);
  }

  @Mutation((returns) => TodoModel)
  async updateTodo(
    @Context() context: any,
    @Args('id') id: string,
    @Args('isCompleted') isCompleted: boolean,
  ) {
    return this.todosService.update(id, isCompleted);
  }

  @Mutation((returns) => TodoModel)
  async deleteTodo(@Context() context: any, @Args('id') id: string) {
    return this.todosService.remove(id);
  }
}
