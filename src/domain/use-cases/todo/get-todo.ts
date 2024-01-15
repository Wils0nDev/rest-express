import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.enity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodoUseCase {

    execute(id:number):Promise<TodoEntity>

}

export class GetTodo implements GetTodoUseCase {
    constructor(private readonly repository : TodoRepository) { }
    
    execute(id: number): Promise<TodoEntity> {
        return this.repository.findById(id);
    }
}