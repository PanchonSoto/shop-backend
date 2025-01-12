import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

interface TokenPayload {
    id: number;
    email: string;
    username: string;
    // created_at: Date;
}


export class JwtAdapter {

    static async generateToken(payload: any, duration: string ='7d') {
        return new Promise((resolve)=>{
            jwt.sign(payload, JWT_SEED, {expiresIn: duration}, (err, token)=>{
                if(err) return resolve(null);
                resolve(token);
            });
        });
    }

    static validateToken(token: string): Promise<TokenPayload | null> {
        return new Promise((resolve)=>{
            jwt.verify(token, JWT_SEED, (err, decoded)=>{
                if(err) return resolve(null);
                resolve(decoded as TokenPayload);
            });
        });
    }

}
