import { Request, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SuccessPayload } from './dto/success.payload';
import { TodoModel } from './models/todo.model';
import { TodosService } from './todos.service';

@UseGuards(JwtAuthGuard)
@Resolver()
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query((returns) => [TodoModel])
  async listTodos(@Context() context: any) {
    return this.todosService.findAll(context.req.user.id);
  }

  @Mutation((returns) => TodoModel)
  async createTodo(
    @Args('title') title: string,
    @Args('isCompleted') isCompleted: boolean,
    @Context() context: any,
  ) {
    return this.todosService.create(title, isCompleted, context.req.user.id);
  }

  @Mutation((returns) => TodoModel)
  async updateTodo(
    @Args('id') id: string,
    @Args('isCompleted') isCompleted: boolean,
    @Context() context: any,
  ) {
    return this.todosService.update(id, isCompleted, context.req.user.id);
  }

  @Mutation((returns) => SuccessPayload)
  async deleteTodo(@Args('id') id: string, @Context() context: any) {
    try {
      await this.todosService.remove(id, context.req.user.id);
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }
}
