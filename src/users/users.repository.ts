import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      name: 'Juan',
      email: 'algo@algo.com',
    },
    {
      id: 2,
      name: 'Pedro',
      email: 'algo2@algo.com',
    },
  ];

  async getTodo() {
    return this.users;
  }

  async getById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  async getByName(name: string) {
    return this.users.find((user) => user.name === name);
  }

  async createUser(user: Omit<User, 'id'>) {
    const id = this.users.length + 1;
    this.users = [...this.users, { id, ...user }];
    return { id, ...user };
  }
}
