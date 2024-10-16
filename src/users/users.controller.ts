import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

// Este users seria la ruta /users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
