import { CustomError } from "../../errors/custom.error";
import { INegocioRepository } from "../../repositories";
import { NegocioEntity } from "../../entities";

export class GetNegocioByUser {
  constructor(private readonly negocioRepository: INegocioRepository) {}

  async execute(userId: number): Promise<NegocioEntity> {
    const negocio = await this.negocioRepository.getNegocioByUser(userId);

    if (!negocio)
      throw CustomError.notFound(`User's negocio ${userId} does not exists.`);

    return negocio;
  }
}
