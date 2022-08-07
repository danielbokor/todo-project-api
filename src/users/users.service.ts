import { Injectable } from '@nestjs/common';
import { UserInterface } from './interfaces/user.interface';
import { UserModel } from './models/user.model';

@Injectable()
export class UsersService {
  async getById(id: string): Promise<UserModel> {
    const user: UserModel = {
      id,
      email: 'x@y.com',
      password: 'abcd',
    };

    return Promise.resolve(user);
  }

  async findAll(): Promise<UserModel[]> {
    const users: UserModel[] = [
      {
        id: '123',
        email: 'x@y.com',
        password: 'abcd',
      },
    ];
    return Promise.resolve(users);
  }
}
