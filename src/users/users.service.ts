import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    @Inject('API_USERS') private apiUsers: any,
  ) {}

  async getUsers() {
    const dbUSers = await this.usersRepository.getTodo();
    const users = [...dbUSers, ...this.apiUsers];
    return users;
  }

  getUserById(id: number) {
    return this.usersRepository.getById(id);
  }

  getUsersByName(name: string) {
    return this.usersRepository.getByName(name);
  }
}
