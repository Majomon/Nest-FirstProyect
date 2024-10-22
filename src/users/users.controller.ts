import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { MinSizeValidatorPipe } from 'src/pipes/min-size-validator.pipe';
import { AuthService } from './auth.service';
import { CloudinaryService } from './cloudinary.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserCredentialsDto } from './dtos/UserCredentials.dto';
import { UsersService } from './users.service';
import { UsersDBService } from './usersDb.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

// Este users seria la ruta /users
@Controller('users')
// Al colocar el GUARD aca arriba este se aplica a todos los endpoints de este controlador
// @UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDBService: UsersDBService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getUsers(@Query('name') name?: string) {
    if (name) {
      return this.usersDBService.getUsersByName(name);
    }
    return this.usersDBService.getUsers();
  }

  // Headers/Cabecera
  @Get('profile')
  @UseGuards(AuthGuard)
  getUserProfile(
    /* @Headers('token') token?: string */ @Req()
    request: Express.Request & {
      user: any;
    },
  ) {
    /*     if (token !== '1234') {
      return 'Sin acceso';
    } */
    console.log(request.user);

    return 'Este endpoint retorna el perfil  del usuario';
  }

  // Empleando el Guards
  @Post('profile/images')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(MinSizeValidatorPipe)
  // @UseGuards(AuthGuard)
  getUserImage(
    @UploadedFile(
      // Validadores
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000,
            message: 'El archivo debe ser menor a 100kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // return this.cloudinaryService.uploadImage(file);
    return file;
  }

  // @HttpCode(418)
  @Get('coffee')
  getCoffee() {
    try {
      throw new Error();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.I_AM_A_TEAPOT,
          error: 'Envio de cafe fallido',
        },
        HttpStatus.I_AM_A_TEAPOT,
      );
    }
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

  // Ruta por roles
  @Get('admin')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getadmin() {
    return 'Ruta protegida';
  }

  @Get('auth0/protected')
  getAuth0Protected(@Req() req: Request) {
    console.log(req.oidc);

    return JSON.stringify(req.oidc.user);
  }

  // Usuario por ID
  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersDBService.getUserById(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  // Crear usuario
  // Utilizando un interceptor
  @Post('singup')
  @UseInterceptors(DateAdderInterceptor)
  createUser(
    @Body() user: CreateUserDto,
    @Req() request: Request & { now: string },
  ) {
    console.log('Dentro del endpoint: ', request.now);

    return this.authService.singUp({
      ...user,
      createdAt: request.now,
    });
  }

  @Post('singin')
  async singin(@Body() user: UserCredentialsDto) {
    return this.authService.singIn(user.email, user.password);
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
