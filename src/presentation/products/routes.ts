import { Router } from "express";

import { ProductsController } from "./controller";
import { ProductsDataSource } from "../../infrastructure/datasources";
import { ProductsRepository } from "../../infrastructure/repositories";



export class ProductsRoutes {

    static get routes(): Router {

        const router = Router();

        const productsDatasource = new ProductsDataSource();
        const userRepository = new ProductsRepository(productsDatasource);

        const controller = new ProductsController(userRepository);

        //user routes
        //!todo poner middleware de roles
        router.post('/create', controller.createProduct);
        router.put('/update/:productId', controller.updateProduct);
        router.delete('/delete/:productId', controller.deleteProduct);
        router.get('/', controller.getProducts);


        return router;
    }

}
