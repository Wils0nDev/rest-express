import { Router } from "express";
import { TodoRoutes } from "./todos/routes";


export class AppRoutes {
    

    static get routes(): Router {
        const router = Router();

        //use : se usa para los middleware, esto es un middleware que ejecuta todo lo que pase por esta 
        //funcion
        router.use('/api/todos',TodoRoutes.routes);


        return router;
    }
}