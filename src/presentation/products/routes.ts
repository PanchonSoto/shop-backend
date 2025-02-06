import { Router } from "express";

import { ProductsController } from "./controller";

import { AuthMiddleware } from "../../infrastructure/middlewares/auth.middleware";
import {
  ProductsDataSource,
  NegocioDataSource,
} from "../../infrastructure/datasources";
import {
  ProductsRepository,
  NegocioRepository,
} from "../../infrastructure/repositories";

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();

    const productsDatasource = new ProductsDataSource();
    const negocioDatasource = new NegocioDataSource();

    const negocioRepository = new NegocioRepository(negocioDatasource);
    const userRepository = new ProductsRepository(
      productsDatasource,
      negocioRepository
    );

    const controller = new ProductsController(userRepository);

    //user routes
    //!todo poner middleware de roles
    router.post("/create", controller.createProduct);
    router.put("/update/:productId", controller.updateProduct);
    router.delete("/delete/:productId", controller.deleteProduct);
    router.get("/", [AuthMiddleware.validateJWT], controller.getProducts);

    return router;
  }
}
