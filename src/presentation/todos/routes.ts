import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSource } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { TodoRepositoryImpl } from "../../infrastructure/respositories/todo.repository.impl";


export class TodoRoutes {
    

    static get routes(): Router {

        const datasource = new TodoDataSource() //implementacion
        const todoRepository = new TodoRepositoryImpl(datasource) //Repository implementacion que llama a mi datasource
        const router = Router();
        const todoController = new TodosController(todoRepository);

        router.get('/',todoController.getTodos);
        router.get('/:id',todoController.getTodoById);
        router.post('/create',todoController.createTodo);
        router.put('/:id',todoController.updateTodo);
        router.delete('/:id',todoController.deleteTodo);


        return router;
    }
}