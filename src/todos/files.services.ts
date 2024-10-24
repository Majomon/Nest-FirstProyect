import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './files.entity';
import { Todo } from './todos.entity';

@Injectable()
export class FilesServices {
  constructor(
    @InjectRepository(File) private readonly filesRepository: Repository<File>,
  ) {}

  async saveFile({
    name,
    mimeType,
    data,
    todo,
  }: {
    name: string;
    mimeType: string;
    data: Buffer;
    todo: Todo;
  }) {
    const file = new File();
    file.name = name;
    file.mimeType = mimeType;
    file.data = data;
    file.todo = todo;

    return this.filesRepository.save(file);
  }
}
