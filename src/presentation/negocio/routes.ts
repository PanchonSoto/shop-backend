import { Router } from "express";

import { NegocioController } from "./controller";
import { NegocioDataSource } from "../../infrastructure/datasources";
import { NegocioRepository } from "../../infrastructure/repositories";



export class NegocioRoutes {

    static get routes(): Router {

        const router = Router();

        const negocioDatasource = new NegocioDataSource();
        const userRepository = new NegocioRepository(negocioDatasource);

        const controller = new NegocioController(userRepository);

        //user routes
        //!todo poner middleware de roles
        router.post('/create/:userId', controller.createNegocio)
        router.put('/update/:negocioId', controller.updateNegocio);
        router.delete('/delete/:userId', controller.deleteNegocio);
        router.get('/', controller.getNegocio);


        return router;
    }

}
