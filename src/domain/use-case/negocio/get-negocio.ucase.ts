import { NegocioEntity } from '../../entities';
import { INegocioRepository } from '../../repositories';







export class GetNegocio {

    constructor(
        private readonly negocioRepository: INegocioRepository,
    ){}

    async execute(): Promise<NegocioEntity[]> {
        const negocios = await this.negocioRepository.getNegocios();

        return negocios;
    }

}
