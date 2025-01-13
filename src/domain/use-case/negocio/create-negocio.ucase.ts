import { NegocioEntity } from '../../entities';
import { INegocioRepository } from '../../repositories';



export class CreateNegocio {

    constructor(
        private readonly negocioRepository: INegocioRepository,
    ){}

    async execute(userId:number, name: string): Promise<NegocioEntity> {
        // return await this.negocioRepository.createNegocio(userId);

        const negocio = await this.negocioRepository.createNegocio(userId, name);


        return {
            id: negocio.id,
            name: negocio.name,
            user_id: negocio.user_id
        }

    }

}
