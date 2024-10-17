import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
/* import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard'; */

@Module({
  imports: [UsersModule, TodosModule],
  controllers: [],
  // Manera 2 para hacer el Guard de forma global
  providers: [
/*     {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, */
  ],
})
export class AppModule {}
