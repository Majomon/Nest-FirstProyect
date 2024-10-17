import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'demo-typeorm',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
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
