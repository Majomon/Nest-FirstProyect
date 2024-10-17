import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersDBService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  saveUser(user: Omit<User, 'id'>) {
    return this.usersRepository.save(user);
  }

  getUserById(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  getUsersByName(name: string) {
    return this.usersRepository.findOne({ where: { name } });
  }

  getUsers() {
    return this.usersRepository.find();
  }
}
