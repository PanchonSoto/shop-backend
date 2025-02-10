import { StoreEntity } from "../../entities";
import { CustomError } from "../../errors/custom.error";
import { IStoreRepository } from "../../repositories";

export class UpdateStore {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async execute(
    storeId: number,
    data: Partial<StoreEntity>
  ): Promise<StoreEntity> {
    const existStore = this.storeRepository.verifyStoreExists(storeId);
    if (!existStore)
      throw CustomError.notFound(`Store: ${storeId} don't exists.`);

    //todo: validate that user only can update its own store

    return await this.storeRepository.updateStore(storeId, data);
  }
}
