import { Request, Response} from "express";
import { INegocioRepository } from "../../domain/repositories";
import { CreateNegocio, DeleteNegocio, GetNegocio, UpdateNegocio } from "../../domain/use-case";

import { handleError } from "../../shared/handleError";


interface NegocioFields {
    id: number,
    name: string,
    user_id: number,
}

export class NegocioController {

    constructor(
        private readonly negocioRepository: INegocioRepository
    ){}



    getNegocio = (req: Request, res: Response) => {

        new GetNegocio(this.negocioRepository)
            .execute()
            .then((users)=>res.status(200).json(users))
            .catch(error => handleError(error, res));

    }

    createNegocio = (req: Request, res: Response) => {

        const userId = Number(req.params.userId);

        if (isNaN(userId)) {
            return res.status(400).json({error:'Invalid id.'});
        }


        const { name } = req.body;

        if (!name) {
            return res.status(400).json({error:'negocio name is required.'});
        }

        new CreateNegocio(this.negocioRepository)
            .execute(userId, name)
            .then((user)=>res.status(200).json(user))
            .catch(error => handleError(error, res));

    }

    updateNegocio = (req: Request, res: Response) => {

        const negocioId = Number(req.params.negocioId);

        if (isNaN(negocioId)) {
            return res.status(400).json({error:'Invalid id.'});
        }


        const { name, user_id } = req.body;

        if (!name || !user_id) {
            return res.status(400).json({error:'name and user_id are required.'});
        }

        const updateData: Partial<NegocioFields> = {
            ...(name && { name }),
            ...(user_id && {user_id})
        };

        new UpdateNegocio(this.negocioRepository)
            .execute(negocioId, updateData)
            .then((user)=>res.status(200).json(user))
            .catch(error => handleError(error, res));

    }

    deleteNegocio = (req: Request, res: Response) => {

        const userId = Number(req.params.userId);

        if(!userId) return res.sendStatus(400).json({error:'userId is required.'});

        new DeleteNegocio(this.negocioRepository)
            .execute(userId)
            .then(()=>res.sendStatus(204))
            .catch(error => handleError(error, res));

    }
}
