import { Router } from "express";

import { ProductsController } from "./controller";

import { AuthMiddleware } from "../../infrastructure/middlewares/auth.middleware";
import { RoleMiddleware } from "../../infrastructure/middlewares/admin.middleware";
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
    const productRepository = new ProductsRepository(productsDatasource);

    const controller = new ProductsController(
      productRepository,
      negocioRepository
    );

    //products routes
    router.post(
      "/create",
      [AuthMiddleware.validateJWT, RoleMiddleware(["ADMIN", "NEGOCIO"])],
      controller.createProduct
    );
    router.put(
      "/update/:productId",
      [AuthMiddleware.validateJWT, RoleMiddleware(["ADMIN", "NEGOCIO"])],
      controller.updateProduct
    );
    router.delete(
      "/delete/:productId",
      [AuthMiddleware.validateJWT, RoleMiddleware(["ADMIN", "NEGOCIO"])],
      controller.deleteProduct
    );
    router.get("/", [AuthMiddleware.validateJWT], controller.getProducts);

    return router;
  }
}
