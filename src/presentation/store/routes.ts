import { Router } from "express";

import { StoreController } from "./controller";
import { StoreDataSource } from "../../infrastructure/datasources";
import { StoreRepository } from "../../infrastructure/repositories";

export class StoreRoutes {
  static get routes(): Router {
    const router = Router();

    const storeDatasource = new StoreDataSource();
    const storeRepository = new StoreRepository(storeDatasource);

    const controller = new StoreController(storeRepository);

    //store routes
    router.post("/create", controller.createStore);
    router.put("/update/:storeId", controller.updateStore);
    router.delete("/delete/:storeId", controller.deleteStore);
    router.get("/", controller.getStore);

    return router;
  }
}
