import { CustomError } from "../../errors/custom.error";

import { INegocioRepository } from "../../repositories";

export class DeleteNegocio {
  constructor(private readonly negocioRepository: INegocioRepository) {}

  async execute(id: number): Promise<void> {
    const existNegocio = this.negocioRepository.verifyNegocioExists(id);

    //todo: validate that user only can delete its own negocio

    if (!existNegocio)
      throw CustomError.notFound(`Negocio with id: ${id} does not exists.`);

    await this.negocioRepository.deleteNegocio(id);
  }
}
