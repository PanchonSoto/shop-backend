import { Router } from "express";

import { AuthController } from "./controller";
import { AuthDataSource } from "../../infrastructure/datasources";
import { AuthRepository } from "../../infrastructure/repositories";




export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        const authDatasource = new AuthDataSource();
        const authRepository = new AuthRepository(authDatasource);

        const controller = new AuthController(authRepository);

        //auth routes
        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);


        return router;
    }

}
