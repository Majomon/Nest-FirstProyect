import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private users = [
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
}
