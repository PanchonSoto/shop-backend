import { Request, Response } from "express";
import { IStoreRepository } from "../../domain/repositories";
import {
  CreateStore,
  DeleteStore,
  GetStore,
  UpdateStore,
} from "../../domain/use-case";

import { handleError } from "../../shared/handleError";

interface StoreFields {
  id: number;
  name: string;
  user_id: number;
}

export class StoreController {
  constructor(private readonly storeRepository: IStoreRepository) {}

  getStore = (req: Request, res: Response) => {
    new GetStore(this.storeRepository)
      .execute()
      .then((stores) => res.status(200).json(stores))
      .catch((error) => handleError(error, res));
  };

  createStore = (req: Request, res: Response) => {
    const user = req.user;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "store name is required." });
    }

    new CreateStore(this.storeRepository)
      .execute(user!.id, name)
      .then((createdStore) => res.status(200).json(createdStore))
      .catch((error) => handleError(error, res));
  };

  updateStore = (req: Request, res: Response) => {
    const user = req.user;
    const storeId = Number(req.params.storeId);
    const { name } = req.body;

    if (isNaN(storeId)) {
      return res.status(400).json({ error: "Invalid id." });
    }

    if (!name) {
      return res.status(400).json({ error: "name are required." });
    }

    const updateData: Partial<StoreFields> = {
      ...(name && { name }),
      // ...(user!.id && { user_id: user!.id }),
    };

    new UpdateStore(this.storeRepository)
      .execute(user!, storeId, updateData)
      .then((storeUpdated) => res.status(200).json(storeUpdated))
      .catch((error) => handleError(error, res));
  };

  deleteStore = (req: Request, res: Response) => {
    const storeId = Number(req.params.storeId);

    if (!storeId)
      return res.sendStatus(400).json({ error: "storeId is required." });

    new DeleteStore(this.storeRepository)
      .execute(storeId)
      .then(() => res.sendStatus(204))
      .catch((error) => handleError(error, res));
  };
}
