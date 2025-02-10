import { Router } from "express";

import { ProductsController } from "./controller";

import { AuthMiddleware } from "../../infrastructure/middlewares/auth.middleware";
import { RoleMiddleware } from "../../infrastructure/middlewares/admin.middleware";
import {
  ProductsDataSource,
  StoreDataSource,
} from "../../infrastructure/datasources";
import {
  ProductsRepository,
  StoreRepository,
} from "../../infrastructure/repositories";

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();

    const productsDatasource = new ProductsDataSource();
    const storeDatasource = new StoreDataSource();

    const storeRepository = new StoreRepository(storeDatasource);
    const productRepository = new ProductsRepository(productsDatasource);

    const controller = new ProductsController(
      productRepository,
      storeRepository
    );

    //products routes
    router.post(
      "/create",
      [AuthMiddleware.validateJWT, RoleMiddleware(["ADMIN", "STORE"])],
      controller.createProduct
    );
    router.put(
      "/update/:productId",
      [AuthMiddleware.validateJWT, RoleMiddleware(["ADMIN", "STORE"])],
      controller.updateProduct
    );
    router.delete(
      "/delete/:productId",
      [AuthMiddleware.validateJWT, RoleMiddleware(["ADMIN", "STORE"])],
      controller.deleteProduct
    );
    router.get("/", [AuthMiddleware.validateJWT], controller.getProducts);

    return router;
  }
}
