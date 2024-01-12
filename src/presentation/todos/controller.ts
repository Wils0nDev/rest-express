import { error } from "console";
import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", createdAt: new Date() },
  { id: 2, text: "Buy bread", createdAt: new Date() },
  { id: 3, text: "Buy butter", createdAt: new Date() },
];
export class TodosController {
  //*DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID no valido" });

    const todo = todos.find((todo) => todo.id === id);

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo con id ${id} not found` });
    //res.json(todo)
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Texto es requerido" });

    const newTodo = {
      id: todos.length + 1,
      text: text,
      createdAt: new Date(),
    };
    todos.push(newTodo)
    //(todo) ? res.json(todo) : res.status(404).json({error : `Todo con id ${id} not found`});
    res.json(todos);
  };

  public updateTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    const idUpdate = +req.params.id 
    if (isNaN(idUpdate)) return res.status(400).json({ error: "ID no existe" });

    const todo = todos.find((todo) => todo.id === idUpdate);
    if(!todo) return res.status(404).json({error : `Todo con id ${idUpdate} no existe`})

    if (!text) return res.status(400).json({ error: "Texto es requerido" });
    todo.text = text
    //(todo) ? res.json(todo) : res.status(404).json({error : `Todo con id ${id} not found`});
    res.json(todo);
  };


  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id 

    if (isNaN(id)) return res.status(400).json({ error: "ID no existe" });

    const todo = todos.find((todo) => todo.id === id)
    if(!todo) return res.status(404).json({error : `Todo con id ${id} no existe`})
    todos.splice(todos.indexOf(todo),1)
    //(todo) ? res.json(todo) : res.status(404).json({error : `Todo con id ${id} not found`});
    res.json(todos);
  };
}
