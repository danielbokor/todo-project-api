import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoModel } from './models/todo.model';
import { TodosService } from './todos.service';

@Resolver()
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query((returns) => [TodoModel])
  async listTodos() {
    return this.todosService.findAll();
  }

  @Mutation((returns) => TodoModel)
  async createTodo(
    @Args('title') title: string,
    @Args('isCompleted') isCompleted: boolean,
  ) {
    return this.todosService.create(title, isCompleted);
  }

  @Mutation((returns) => TodoModel)
  async updateTodo(
    @Args('id') id: string,
    @Args('isCompleted') isCompleted: boolean,
  ) {
    return this.todosService.update(id, isCompleted);
  }

  @Mutation((returns) => TodoModel)
  async deleteTodo(@Args('id') id: string) {
    return this.todosService.remove(id);
  }
}
