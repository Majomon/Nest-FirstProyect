import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesServices } from './files.services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Todos")
@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly filesService: FilesServices,
  ) {}

  @Get()
  getTodos() {
    return this.todosService.getTodos();
  }

  @Post()
  createTodo(@Body() todo: any) {
    return this.todosService.create(todo);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  //El id llega como string y si por algun motivo lo necesito como number con el validationPipe lo transformo
  getTodoById(@Param('id') id: number) {
    return this.todosService.findById(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const todo = await this.todosService.findById(id);

    return this.filesService.saveFile({
      name: file.originalname,
      mimeType: file.mimetype,
      data: file.buffer,
      todo,
    });
  }
}
