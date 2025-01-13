import { INegocioDataSource } from "../../domain/datasources";
import { NegocioEntity } from "../../domain/entities";
import { INegocioRepository } from "../../domain/repositories";





export class NegocioRepository implements INegocioRepository {


    constructor(
        private readonly negocioDataSource: INegocioDataSource
    ) {}


    getNegocios(): Promise<NegocioEntity[]> {
        return this.negocioDataSource.getNegocios();
    }

    createNegocio(userId:number, name: string): Promise<NegocioEntity> {
        return this.negocioDataSource.createNegocio(userId, name);
    }

    deleteNegocio(id: number): Promise<void> {
        return this.negocioDataSource.deleteNegocio(id);
    }

    updateNegocio(negocioId: number, data: Partial<NegocioEntity>): Promise<NegocioEntity> {
        return this.negocioDataSource.updateNegocio(negocioId, data);
    }



}
