import { Router } from "express";

import { AuthRoutes } from "./auth/routes";




export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        //app routes
        router.use('/api/auth', AuthRoutes.routes);



        return router;
    }

    // public static async create(app: express.Application): Promise<void> {
    //     app.get('/', (req, res) => {
    //         res.send('Hello World');
    //     });
    // }
}
