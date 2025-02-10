import { StoreEntity } from "../../entities";
import { IStoreRepository } from "../../repositories";

export class GetStore {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async execute(): Promise<StoreEntity[]> {
    const stores = await this.storeRepository.getStores();

    return stores;
  }
}
