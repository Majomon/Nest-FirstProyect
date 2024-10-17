import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersDBService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  saveUser(user: User) {
    return this.usersRepository.save(user);
  }
}
