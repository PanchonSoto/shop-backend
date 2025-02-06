import { NegocioEntity } from "../../entities";
import { INegocioRepository } from "../../repositories";

export class GetNegocioByUser {
  constructor(private readonly negocioRepository: INegocioRepository) {}

  async execute(userId: number): Promise<NegocioEntity> {
    const negocio = await this.negocioRepository.getNegocioByUser(userId);

    return negocio;
  }
}
