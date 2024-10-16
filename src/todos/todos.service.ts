import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
    getTodos(){
        return "Todos los TODOS"
    }
}
