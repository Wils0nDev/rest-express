import { error } from "console";
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { CreateTodo, DeleteTodo, GetTodo,GetTodos, UpdateTodo } from '../../domain';


export class TodosController {
  //*DI
  constructor(
    private readonly todoRepository : TodoRepository,
  ) {}

  public getTodos = (req: Request, res: Response) => {

    //mis casos de uso llaman a los repositorios
    new GetTodos(this.todoRepository).execute()
    .then(todos => res.json(todos))
    .catch(error => res.status(400).json({error}));
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    new GetTodo(this.todoRepository).execute(id)
    .then(todos => res.json(todos))
    .catch(error => res.status(400).json({error}));
  };

  public createTodo =  (req: Request, res: Response) => {
    
    const [ error , createTodoDto ] = CreateTodoDto.create(req.body)
    if(error) return res.status(400).json({ error });
    new CreateTodo(this.todoRepository).execute(createTodoDto!)
    .then(todos => res.json(todos))
    .catch(error => res.status(400).json({error}));

  };

  public updateTodo =  (req: Request, res: Response) => {
    const id = +req.params.id 

    const [error, updateTodoDto] = UpdateTodoDto.update({...req.body,id})
    new UpdateTodo(this.todoRepository).execute(updateTodoDto!)
    .then(todos => res.json(todos))
    .catch(error => res.status(400).json({error}));
  };


  public deleteTodo =  (req: Request, res: Response) => {
    const id = +req.params.id 

    new DeleteTodo(this.todoRepository).execute(id)
    .then(todos => res.json(todos))
    .catch(error => res.status(400).json({error}));
  };
}
