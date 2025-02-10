import { Router } from "express";

import { AuthMiddleware } from "../infrastructure/middlewares/auth.middleware";
import { RoleMiddleware } from "../infrastructure/middlewares/admin.middleware";

import { AuthRoutes } from "./auth/routes";
import { UserRoutes } from "./user/routes";
import { NegocioRoutes } from "./negocio/routes";
import { ProductsRoutes } from "./products/routes";
import { OrdersRoutes } from "./orders/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //app routes
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/user", UserRoutes.routes);
    router.use(
      "/api/negocio",
      [AuthMiddleware.validateJWT, RoleMiddleware(["ADMIN", "NEGOCIO"])],
      NegocioRoutes.routes
    );
    router.use("/api/products", ProductsRoutes.routes);
    router.use("/api/orders", OrdersRoutes.routes);

    return router;
  }

  // public static async create(app: express.Application): Promise<void> {
  //     app.get('/', (req, res) => {
  //         res.send('Hello World');
  //     });
  // }
}
