import { NegocioEntity } from "../../entities";
import { CustomError } from "../../errors/custom.error";
import { INegocioRepository } from "../../repositories";

export class CreateNegocio {
  constructor(private readonly negocioRepository: INegocioRepository) {}

  async execute(userId: number, name: string): Promise<NegocioEntity> {
    const existNegocioName = await this.negocioRepository.verifyNegocioExists(
      undefined,
      name
    );
    if (existNegocioName)
      throw CustomError.badRequest(`Negocio with name ${name} already exists.`);

    const existUserNegocio =
      await this.negocioRepository.getNegocioByUser(userId);
    if (existUserNegocio)
      throw CustomError.badRequest(`User already have a Negocio.`);

    const negocio = await this.negocioRepository.createNegocio(userId, name);

    return {
      id: negocio.id,
      name: negocio.name,
      user_id: negocio.user_id,
    };
  }
}
