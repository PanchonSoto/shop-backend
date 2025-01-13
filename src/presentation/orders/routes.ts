import { Router } from "express";

import { OrdersController } from "./controller";
import { OrdersDataSource } from "../../infrastructure/datasources";
import { OrdersRepository } from "../../infrastructure/repositories";



export class OrdersRoutes {

    static get routes(): Router {

        const router = Router();

        const ordersDatasource = new OrdersDataSource();
        const userRepository = new OrdersRepository(ordersDatasource);

        const controller = new OrdersController(userRepository);

        //user routes
        //!todo poner middleware de roles
        router.post('/create', controller.createOrder);
        router.put('/update/:orderId', controller.updateOrder);
        router.delete('/delete/:orderId', controller.deleteOrder);
        router.get('/', controller.getOrders);


        return router;
    }

}
