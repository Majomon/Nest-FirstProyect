import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { UsersDBService } from './usersDb.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersDBService,
    private readonly jwtService: JwtService,
  ) {}

  async singUp(user: Omit<User, 'id'>) {
    const dbUser = await this.usersService.getUserByEmail(user.email);
    if (dbUser) {
      throw new BadRequestException('El email existe en la bdd');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (!hashedPassword) {
      throw new BadRequestException('El password no se pudo hashear');
    }

    const up = await this.usersService.saveUser({
      ...user,
      password: hashedPassword,
    });
    console.log(up);
  }

  async singIn(email: string, password: string) {
    const dbUser = await this.usersService.getUserByEmail(email);

    if (!dbUser) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, dbUser.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Password invalido');
    }

    const userPayload = {
      sub: dbUser.id,
      id: dbUser.id,
      email: dbUser.email,
      // isAdmin: dbUser.isAdmin,
      roles: [dbUser.isAdmin ? Role.Admin : Role.User],
    };

    const token = this.jwtService.sign(userPayload);

    return { success: 'User logeado con exito', token, userPayload };
  }
}
