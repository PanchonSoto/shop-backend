import { Router } from "express";

import { AuthController } from "./controller";
import { AuthDataSource } from "../../infrastructure/datasources";
import { AuthRepository } from "../../infrastructure/repositories";




export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        const database = new AuthDataSource();
        const authRepository = new AuthRepository(database);

        const controller = new AuthController(authRepository);

        //auth routes
        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);


        return router;
    }

}
