import { Request, Response } from "express";

import { IAuthRepository } from "../../domain/repositories/auth.repository.interface";
import { RegisterUserDto, LoginUserDto } from "../../domain/dtos";
import { RegisterUser, LoginUser } from "../../domain/use-case";

import { handleError } from '../../shared/handleError';




export class AuthController {


    constructor(
        private readonly authRepository: IAuthRepository
    ){}



    //los controladores llaman a los casos de uso
    registerUser = (req: Request, res: Response) => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if(error) return res.status(400).json({error});

        new RegisterUser(this.authRepository)
            .execute(registerUserDto!)
            .then(data=> res.json(data))
            .catch(error => handleError(error, res));

        // this.authRepository.registerUser(registerUserDto!)
        //     .then(user => res.json(user))
        //     .catch(error => handleError(error, res));

        // res.json({message: 'Login User'});
    }

    loginUser = (req: Request, res: Response) => {

        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if(error) return res.status(400).json({error});

        new LoginUser(this.authRepository)
            .execute(loginUserDto!)
            .then(data=> res.json(data))
            .catch(error => handleError(error, res));

    }

}
