import { INegocioRepository } from '../../repositories';







export class DeleteNegocio {

    constructor(
        private readonly negocioRepository: INegocioRepository,
    ){}

    async execute(id: number): Promise<void> {
        await this.negocioRepository.deleteNegocio(id);
    }

}
