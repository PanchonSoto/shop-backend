import { NegocioEntity } from '../entities';



export abstract class INegocioRepository {

    abstract getNegocios(): Promise<NegocioEntity[]>;

    abstract createNegocio(userId:number, name: string): Promise<NegocioEntity>;

    abstract deleteNegocio(id: number): Promise<void>;

    abstract updateNegocio(negocioId: number, data: Partial<NegocioEntity>): Promise<NegocioEntity>;

}
