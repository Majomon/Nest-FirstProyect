import { Inject, Injectable } from '@nestjs/common';
import { TodosRepository } from './todos.repository';
import { Repository } from 'typeorm';
import { Todo } from './todos.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
  constructor(
    private todosRepository: TodosRepository,
    @Inject('ACCESS_TOKEN') private accessToken: string,
    // Con esto tengo acceso al repositorio de TypeOrm
    @InjectRepository(Todo)
    private todosDBRepository: Repository<Todo>,
  ) {}
  /*   getTodos() {
    return this.accessToken === 'Esta es mi clave secreta'
      ? this.todosRepository.getTodo()
      : 'No tiene acceso a esta información';
  } */
  getTodos() {
    return this.todosDBRepository.find({
      relations: ['files'],
    });
  }

  findById(id: number) {
    return this.todosDBRepository.findOne({
      where: { id },
      relations: ['files'],
    });
  }

  create(todo: Omit<Todo, 'id'>) {
    return this.todosDBRepository.save(todo);
  }
}
