import { Injectable } from '@nestjs/common';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(private todosRepository: TodosRepository) {}
  getTodos() {
    return this.todosRepository.getTodo();
  }
}
