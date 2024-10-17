import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: './.env.development',
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
      /*       useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('DB_NAME'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        synchronize: true,
        logging: true,
        entities: [User, Todo],
      }), */
    }),
    UsersModule,
    TodosModule,
  ],
  controllers: [],
  // Manera 2 para hacer el Guard de forma global
  providers: [
    /*     {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, */
    /*     {
      provide: APP_INTERCEPTOR,
      useClass: MyInterceptor,
    }, */
  ],
})
export class AppModule {}
