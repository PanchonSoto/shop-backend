import { Router } from "express";

import { AuthRoutes } from "./auth/routes";
import { UserRoutes } from "./user/routes";
import { NegocioRoutes } from "./negocio/routes";





export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        //app routes
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/user', UserRoutes.routes);
        router.use('/api/negocio', NegocioRoutes.routes);



        return router;
    }

    // public static async create(app: express.Application): Promise<void> {
    //     app.get('/', (req, res) => {
    //         res.send('Hello World');
    //     });
    // }
}
