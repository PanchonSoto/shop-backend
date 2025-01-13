import { Router } from "express";

import { UserController } from "./controller";
import { UserDataSource } from "../../infrastructure/datasources";
import { UserRepository } from "../../infrastructure/repositories";



export class UserRoutes {

    static get routes(): Router {

        const router = Router();

        const userDatasource = new UserDataSource();
        const userRepository = new UserRepository(userDatasource);

        const controller = new UserController(userRepository);

        //user routes
        //!todo poner middleware de roles
        router.put('/update/:userId', controller.updateUser);
        router.delete('/delete/:userId', controller.deleteUser);
        router.get('/', controller.getUser);


        return router;
    }

}
