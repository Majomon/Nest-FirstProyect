import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { AuthService } from './auth.service';
import { CloudinaryService } from './cloudinary.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersDBService } from './usersDb.service';

/* const mockUserService = {
  getUsers: () => 'Esto es un servicio MOCK de usuarios',
}; */

@Module({
  // Para poder usar las entidades
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    UsersRepository,
    UsersDBService,
    CloudinaryConfig,
    CloudinaryService,
    AuthService,
    {
      provide: 'API_USERS',
      useFactory: async () => {
        const apiUsers = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        ).then((response) => response.json());
        return apiUsers.map((user) => {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        });
      },
    },
  ],
  // providers: [{ provide: UsersService, useValue: mockUserService }],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Para aplicarlo especificamente a una ruta
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
