import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { NewUserInput } from './dto/new-user-input';
import { UserModel } from './models/user.model';

@Injectable()
export class UsersService {
  private usersRepo: UserModel[] = [];
  constructor() {
    this.usersRepo = [];
  }

  async create(data: NewUserInput): Promise<UserModel> {
    let existentUser: UserModel;

    try {
      existentUser = await this.findOne(data.email);
    } catch (e) {}

    if (existentUser) {
      throw new BadRequestException(`email ${data.email} already saved in db`);
    }

    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(data.password, salt);

    const newUser: UserModel = {
      id: randomUUID(),
      ...data,
      password: encryptedPassword,
    };

    this.usersRepo.push(newUser);

    return newUser;
  }

  async findOne(email: string): Promise<UserModel> {
    const user = this.usersRepo.find((item) => item.email === email);

    return user
      ? Promise.resolve(user)
      : Promise.reject(new NotFoundException(`email not found ${email}`));
  }

  async findOneByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserModel> {
    const existentUser = await this.findOne(email);

    const isMatch = await bcrypt.compare(password, existentUser.password);
    if (!isMatch) {
      throw new BadRequestException('Email/password combination is wrong');
    }

    return existentUser;
  }

  async findOneById(id: string): Promise<UserModel> {
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
