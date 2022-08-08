import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { UserEntity } from '../entities/user.entity';
import { TodoModel } from './models/todo.model';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(title: string, isCompleted: boolean, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });

    const newTodo = this.todoRepository.create({
      title,
      isCompleted,
      user,
    });
    return this.todoRepository.save(newTodo) as unknown as TodoModel;
  }

  async update(id: string, isCompleted: boolean, userId: string) {
    const existentTodo = await this.todoRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    if (!existentTodo || existentTodo.user.id !== userId) {
      throw new BadRequestException();
    }

    existentTodo.isCompleted = isCompleted;

    return this.todoRepository.save(existentTodo) as unknown as TodoModel;
  }

  async remove(id: string, userId: string) {
    const existentTodo = await this.todoRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    if (!existentTodo || existentTodo.user.id !== userId) {
      throw new BadRequestException();
    }

    await this.todoRepository.remove(existentTodo);

    return existentTodo;
  }

  async findAll(userId: string) {
    const todos = await this.todoRepository.find({
      relations: {
        user: true,
      },
      order: {
        id: 'ASC',
      },
      where: {
        user: {
          id: userId,
        },
      },
    });

    return todos as TodoModel[];
  }
}
