import { NextFunction, Request, Response } from "express";

import { JwtAdapter } from "../../config/jwt";
import { UsersModel } from "../../data/postgres/models/user.model";
import { UserEntity } from "../../domain/entities";

// Extend the Express Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ error: "No token provided" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid bearer token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken(token);
      if (!payload) return res.status(401).json({ error: "Invalid token" });

      const existUser = await UsersModel.findOne({
        where: { id: payload.user.id },
        attributes: ["id", "email", "role", "name", "is_verified"],
      });

      if (!existUser)
        return res.status(404).json({ error: "User does not exists" });

      req.user = {
        // Use req.user, NOT req.body.user
        id: existUser.id!,
        role: existUser.role,
        name: existUser.name,
        email: existUser.email,
        password: "",
        is_verified: existUser.is_verified!,
      };

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
