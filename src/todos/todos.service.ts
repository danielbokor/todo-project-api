import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TodoModel } from './models/todo.model';

@Injectable()
export class TodosService {
  private todosRepo: TodoModel[] = [];

  constructor() {
    this.todosRepo = [];
  }

  async create(title: string, isCompleted: boolean) {
    const newTodo = {
      id: randomUUID(),
      title,
      isCompleted,
    };

    this.todosRepo.push(newTodo);

    return newTodo;
  }

  async update(id: string, isCompleted: boolean) {
    const existentTodo = this.todosRepo.find((item) => item.id === id);

    if (!existentTodo) {
      throw new BadRequestException();
    }

    existentTodo.isCompleted = isCompleted;

    return existentTodo;
  }

  async remove(id: string) {
    const existentTodo = this.todosRepo.find((item) => item.id === id);

    if (!existentTodo) {
      throw new BadRequestException();
    }

    this.todosRepo = this.todosRepo.filter((item) => item.id !== id);

    return existentTodo;
  }

  async findAll() {
    return Promise.resolve(this.todosRepo);
  }
}
