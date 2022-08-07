import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewUserInput } from './dto/new-user-input';
import { UserModel } from './models/user.model';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

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

    const newUser = this.userRepository.create({
      ...data,
      password: encryptedPassword,
    });
    return this.userRepository.save(newUser) as unknown as UserModel;
  }

  async findOne(email: string): Promise<UserModel> {
    return this.userRepository.findOneBy({ email }) as unknown as UserModel;
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
    return this.userRepository.findOneBy({ id }) as unknown as UserModel;
  }

  async findAll(): Promise<UserModel[]> {
    return this.userRepository.find({}) as unknown as UserModel[];
  }
}
