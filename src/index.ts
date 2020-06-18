import express from 'express';
import {createConnection} from 'typeorm';
import 'reflect-metadata';
import { TYPES } from './config/types'
import {myContainer} from './config/dependency'
import { RegistrableController } from './config/Registrable';

//server class
class Server{
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void {
        // connection BD
        createConnection();
        //Settings
        this.app.set('port', process.env.PORT || 5000);
        // Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    public routes(): void {

        // grabs the Controller from IoC container and registers all the endpoints
        const controllers: RegistrableController[] = myContainer.getAll<RegistrableController>(TYPES.Controller);
        controllers.forEach(controller => controller.register(this.app));
    }

    public start(): void {
        this.app.listen(this.app.get('port'), () =>{
            console.log(`server on port ${this.app.get('port')}`);
        });
    }
}

const server = new Server();
server.start();




