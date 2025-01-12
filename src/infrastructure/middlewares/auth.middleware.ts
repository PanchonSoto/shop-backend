import { NextFunction, Request, Response } from "express";

import { JwtAdapter } from "../../config/jtw";
import { UsersModel } from "../../data/postgres/models/user.model";



export class AuthMiddleware {

    static async validateJWT(req:Request,res:Response,next:NextFunction) {

        const authorization = req.header('Authorization');
        if(!authorization) return res.status(401).json({error: 'No token provided'});
        if(!authorization.startsWith('Bearer ')) return res.status(401).json({error:'Invalid bearer token'});

        const token = authorization.split(' ').at(1) || '';

        try {

            const payload = await JwtAdapter.validateToken(token);
            if(!payload) return res.status(401).json({error:'Invalid token'});

            const existUser = await UsersModel.findOne({
                where: { id: payload.id },
                attributes: ['id', 'email', 'role', 'name'],
            });
            if(!existUser) return res.status(404).json({error:'User does not exists'});

            req.body.user = existUser;

            next();


        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Internal server error'});
        }
    }

}
