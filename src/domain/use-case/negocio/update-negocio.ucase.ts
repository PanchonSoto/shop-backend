import { NegocioEntity } from '../../entities';
import { INegocioRepository } from '../../repositories';







export class UpdateNegocio {

    constructor(
        private readonly negocioRepository: INegocioRepository,
    ){}

    async execute(userId: number, data: Partial<NegocioEntity>): Promise<NegocioEntity> {
        return await this.negocioRepository.updateNegocio(userId, data);
    }

}
