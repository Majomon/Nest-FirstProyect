import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';

const ACCESS_TOKEN = 'Esta es mi clave secreta';

@Module({
  providers: [
    TodosService,
    TodosRepository,
    {
      provide: 'ACCESS_TOKEN',
      useValue: ACCESS_TOKEN,
    },
  ],
  controllers: [TodosController],
})
export class TodosModule {}
