import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';

// Este users seria la ruta /users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('profile')
  getUserProfile() {
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

  @Post()
  createUser() {
    return 'Este endpoint crea un usuario';
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
