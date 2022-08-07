import { Injectable, NotFoundException } from '@nestjs/common';
import { UserModel } from './models/user.model';

@Injectable()
export class UsersService {
  private usersRepo: UserModel[] = [];
  constructor() {
    this.usersRepo = [
      {
        id: '123',
        email: 'x123@y123.com',
        password: 'abcd123',
      },
      {
        id: '456',
        email: 'x456@y456.com',
        password: 'abcd456',
      },
    ];
  }

  async getById(id: string): Promise<UserModel> {
    const user = this.usersRepo.find((item) => item.id === id);
    if (user) {
      return Promise.resolve(user);
    }

    return Promise.reject(new NotFoundException(`ID not found ${id}`));
  }

  async findAll(): Promise<UserModel[]> {
    return Promise.resolve(this.usersRepo);
  }
}
