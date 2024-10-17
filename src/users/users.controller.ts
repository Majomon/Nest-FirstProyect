import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { User } from './user.interface';

// Este users seria la ruta /users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('name') name?: string) {
    if (name) {
      return this.usersService.getUsersByName(name);
    }
    return this.usersService.getUsers();
  }

  // Headers/Cabecera
  @Get('profile')
  getUserProfile(@Headers('token') token?: string) {
    if (token !== '1234') {
      return 'Sin acceso';
    }
    return 'Este endpoint retorna el perfil  del usuario';
  }

  @Get('profile/images')
  getUserImage() {
    return 'Este endpoint retorna las imágenes del usuario';
  }

  @HttpCode(418)
  @Get('coffee')
  getCoffee() {
    return 'No se hacer café, soy una tetera';
  }

  // Acceder al objecto response
  @Get('message')
  getMessage(@Res() response: Response) {
    response.status(200).send('Este es un msj');
  }

  // Acceder al objecto request
  @Get('request')
  getRequest(@Req() request: Request) {
    console.log(request);
    return 'Esta ruta loguea el request';
  }
  // Usuario por ID
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  // Crear usuario
  @Post()
  createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }

  @Put()
  updateUser() {
    return 'Este endpoint modifica un usuario';
  }

  @Delete()
  deleteUser() {
    return 'Este endpoint elimina un usuario';
  }
}
