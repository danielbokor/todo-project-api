import {
  Column,
  Entity,
  JoinTable,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  isCompleted: boolean;

  @ManyToOne((type) => UserEntity, (user) => user.id, {
    cascade: true,
  })
  @JoinTable()
  user: UserEntity;
}
