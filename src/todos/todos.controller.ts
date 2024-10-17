import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getTodos() {
    return this.todosService.getTodos();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  //El id llega como string y si por algun motivo lo necesito como number con el validationPipe lo transformo
  getTodoById(@Param('id') id: number) {
    return this.todosService.getTodos();
  }
}
