import { NegocioEntity } from "../../entities";
import { CustomError } from "../../errors/custom.error";
import { INegocioRepository } from "../../repositories";

export class UpdateNegocio {
  constructor(private readonly negocioRepository: INegocioRepository) {}

  async execute(
    negocioId: number,
    data: Partial<NegocioEntity>
  ): Promise<NegocioEntity> {
    const existNegocio = this.negocioRepository.verifyNegocioExists(negocioId);
    if (!existNegocio)
      throw CustomError.notFound(`Negocio: ${negocioId} don't exists.`);

    //todo: validate that user only can update its own negocio

    return await this.negocioRepository.updateNegocio(negocioId, data);
  }
}
