import { Router } from "express";

import { NegocioController } from "./controller";
import { NegocioDataSource } from "../../infrastructure/datasources";
import { NegocioRepository } from "../../infrastructure/repositories";

export class NegocioRoutes {
  static get routes(): Router {
    const router = Router();

    const negocioDatasource = new NegocioDataSource();
    const userRepository = new NegocioRepository(negocioDatasource);

    const controller = new NegocioController(userRepository);

    //negocio routes
    router.post("/create", controller.createNegocio);
    router.put("/update/:negocioId", controller.updateNegocio);
    router.delete("/delete/:negocioId", controller.deleteNegocio);
    router.get("/", controller.getNegocio);

    return router;
  }
}
