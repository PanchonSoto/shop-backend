import {  } from '../../entities';
import { IAuthRepository } from '../../repositories';



export class ActivateAccount {

    constructor(
        private readonly authRepository: IAuthRepository,
    ){}

    async execute(email: string): Promise<any> {

        const user = await this.authRepository.activateAccount(email);

        return {
            message: 'Account successfully activated.',
            emailAccount: user.email,
        }

    }

}
