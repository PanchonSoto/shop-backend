import { Request, Response} from "express";
import { IUserRepository } from "../../domain/repositories";
import { CustomError } from "../../domain/errors/custom.error";
import { DeleteUser, GetUsers, UpdateUser } from "../../domain/use-case";

import { handleError } from "../../shared/handleError";


interface UserFields {
    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
    is_verified: boolean,
}

export class UserController {

    constructor(
        private readonly userRepository: IUserRepository
    ){}



    getUser = (req: Request, res: Response) => {

        new GetUsers(this.userRepository)
            .execute()
            .then((users)=>res.status(200).json(users))
            .catch(error => handleError(error, res));

    }


    updateUser = (req: Request, res: Response) => {

        const userId = Number(req.params.userId);

        if (isNaN(userId)) {
            return res.status(400).json({error:'Invalid id.'});
        }


        const { name, email, role, is_verified } = req.body;

        if (!name && !email && !role && is_verified === undefined) {
            return res.status(400).json({error:'you must send a least one field from user data'});
        }

        const updateData: Partial<UserFields> = {
            ...(name && { name }),
            ...(email && { email }),
            ...(role && { role }),
            ...(is_verified !== undefined && { is_verified })
        };

        new UpdateUser(this.userRepository)
            .execute(userId, updateData)
            .then((user)=>res.status(200).json(user))
            .catch(error => handleError(error, res));

    }

    deleteUser = (req: Request, res: Response) => {

        const userId = Number(req.params.userId);

        if(!userId) return res.sendStatus(400).json({error:'userId is required.'});

        new DeleteUser(this.userRepository)
            .execute(userId)
            .then(()=>res.sendStatus(204))
            .catch(error => handleError(error, res));


        // res.send(userId);
    }
}
