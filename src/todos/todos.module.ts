import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todos.entity';
import { File } from './files.entity';
import { FilesServices } from './files.services';

const ACCESS_TOKEN = 'Esta es mi clave secreta';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, File])],
  providers: [
    TodosService,
    TodosRepository,
    FilesServices,
    {
      provide: 'ACCESS_TOKEN',
      useValue: ACCESS_TOKEN,
    },
  ],
  controllers: [TodosController],
})
export class TodosModule {}
