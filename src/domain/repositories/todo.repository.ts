import { TodoEntity } from "../entities/todo.enity";
import { CreateTodoDto } from '../dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/todos/update-todo.dto';


export abstract class TodoRepository {
    //inyectamos nuestro dto : data objectransfer
    abstract create(createTodoDto : CreateTodoDto): Promise<TodoEntity>
    //todo:paginación
    abstract getAll () : Promise<TodoEntity[]>
    abstract findById (id:number) : Promise<TodoEntity>
    abstract updateById (updateTodoDto : UpdateTodoDto) : Promise<TodoEntity>
    abstract deleteById (id : number) : Promise<TodoEntity>

}