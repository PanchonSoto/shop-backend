import { NegocioEntity } from "../entities";

export abstract class INegocioRepository {
  abstract verifyNegocioExists(
    negocioId?: number,
    name?: string
  ): Promise<boolean>;

  abstract getNegocios(): Promise<NegocioEntity[]>;

  abstract getNegocioByUser(userId: number): Promise<NegocioEntity | null>;

  abstract createNegocio(userId: number, name: string): Promise<NegocioEntity>;

  abstract deleteNegocio(id: number): Promise<void>;

  abstract updateNegocio(
    negocioId: number,
    data: Partial<NegocioEntity>
  ): Promise<NegocioEntity>;
}
