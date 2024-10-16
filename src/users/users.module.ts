import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Para aplicarlo especificamente a una ruta
    // consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
