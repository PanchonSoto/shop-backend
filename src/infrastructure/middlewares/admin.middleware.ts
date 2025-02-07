import { NextFunction, Request, Response } from "express";

export const RoleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized - No user found" });
    }

    const { role } = req.user;

    if (!allowedRoles.includes(role)) {
      return res
        .status(403)
        .json({ error: "Forbidden - Insufficient privileges" });
    }

    next();
  };
};
