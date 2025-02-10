import { Request, Response } from "express";
import { INegocioRepository } from "../../domain/repositories";
import {
  CreateNegocio,
  DeleteNegocio,
  GetNegocio,
  UpdateNegocio,
} from "../../domain/use-case";

import { handleError } from "../../shared/handleError";

interface NegocioFields {
  id: number;
  name: string;
  user_id: number;
}

export class NegocioController {
  constructor(private readonly negocioRepository: INegocioRepository) {}

  getNegocio = (req: Request, res: Response) => {
    new GetNegocio(this.negocioRepository)
      .execute()
      .then((negocios) => res.status(200).json(negocios))
      .catch((error) => handleError(error, res));
  };

  createNegocio = (req: Request, res: Response) => {
    const user = req.user;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "negocio name is required." });
    }

    new CreateNegocio(this.negocioRepository)
      .execute(user!.id, name)
      .then((createdNegocio) => res.status(200).json(createdNegocio))
      .catch((error) => handleError(error, res));
  };

  updateNegocio = (req: Request, res: Response) => {
    const user = req.user;
    const negocioId = Number(req.params.negocioId);
    const { name } = req.body;

    if (isNaN(negocioId)) {
      return res.status(400).json({ error: "Invalid id." });
    }

    if (!name) {
      return res.status(400).json({ error: "name are required." });
    }

    const updateData: Partial<NegocioFields> = {
      ...(name && { name }),
      ...(user!.id && { user_id: user!.id }),
    };

    new UpdateNegocio(this.negocioRepository)
      .execute(user!.id, updateData)
      .then((negocioUpdated) => res.status(200).json(negocioUpdated))
      .catch((error) => handleError(error, res));
  };

  deleteNegocio = (req: Request, res: Response) => {
    const negocioId = Number(req.params.negocioId);

    if (!negocioId)
      return res.sendStatus(400).json({ error: "negocioId is required." });

    new DeleteNegocio(this.negocioRepository)
      .execute(negocioId)
      .then(() => res.sendStatus(204))
      .catch((error) => handleError(error, res));
  };
}
