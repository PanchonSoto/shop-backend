import { Request, Response } from "express";

import { IAuthRepository } from "../../domain/repositories/auth.repository.interface";
import { RegisterUserDto, LoginUserDto } from "../../domain/dtos";
import { RegisterUser, LoginUser, ActivateAccount } from "../../domain/use-case";
import { RegexUtils } from "../../config/regex-utils";

import { handleError } from '../../shared/handleError';




export class AuthController {


    constructor(
        private readonly authRepository: IAuthRepository
    ){}



    activateAccount = (req: Request, res: Response) => {
        const { email } = req.body;

        if(!email) return res.status(400).json({error: 'provide an email.'});

        if(!RegexUtils.email.test(email)) return res.status(400).json({error: 'provide a valid email.'});

        new ActivateAccount(this.authRepository)
            .execute(email)
            .then(data=>res.json(data))
            .catch(error=> handleError(error,res));

    }

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
