
import express, { Router } from 'express'
import path from 'path'

interface Options { 
    port: number
    routes : Router
    public_path?: string
}

export class Server {
    private app = express();
    private readonly port:number;
    private readonly publicPath: string;
    private readonly routes : Router
    constructor(options : Options){

        const { port,routes, public_path = 'public'} = options

        this.port = port;
        this.publicPath = public_path;
        this.routes = routes
    }
   
    async start(){
        //*Middlewares : es una función que se ejecuta

        //express.json : es un middleware que parsea todo lo que viene en el body de como json
        //raw : postman
        this.app.use(express.json());
        
        //express.urlencoded : es un midddleware que nos permite enviar body de forma x-www-form-urlencoded
        //x-www-form-urlencoded : postman
        this.app.use(express.urlencoded({extended:true}));

        //*Public Folder
        this.app.use(express.static(this.publicPath))

         //Routes
         this.app.use(this.routes)
         
        //Cualquier ruta no definida pasara pro aqui (*) SPA 
        this.app.get('*',(req,res)=>{
            const indexPath = path.join(__dirname  + `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        })
        this.app.listen(this.port,()=>{
            console.log(`Server running ${this.port}`)
        })
    }
}