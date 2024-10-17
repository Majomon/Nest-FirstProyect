import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

/* const mockUserService = {
  getUsers: () => 'Esto es un servicio MOCK de usuarios',
}; */

@Module({
  providers: [
    UsersService,
    UsersRepository,
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
