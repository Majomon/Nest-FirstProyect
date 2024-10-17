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
}
