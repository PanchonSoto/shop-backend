import { IStoreDataSource } from "../../domain/datasources";
import { StoreEntity } from "../../domain/entities";
import { IStoreRepository } from "../../domain/repositories";

export class StoreRepository implements IStoreRepository {
  constructor(private readonly storeDataSource: IStoreDataSource) {}

  async verifyStoreExists(storeId?: number, name?: string): Promise<boolean> {
    const count = await this.storeDataSource.verifyStoreExists(storeId, name);
    return count > 0;
  }

  getStoreByUser(userId: number): Promise<StoreEntity | null> {
    return this.storeDataSource.getStoreByUser(userId);
  }

  getStores(): Promise<StoreEntity[]> {
    return this.storeDataSource.getStores();
  }

  createStore(userId: number, name: string): Promise<StoreEntity> {
    return this.storeDataSource.createStore(userId, name);
  }

  deleteStore(id: number): Promise<void> {
    return this.storeDataSource.deleteStore(id);
  }

  updateStore(
    storeId: number,
    data: Partial<StoreEntity>
  ): Promise<StoreEntity> {
    return this.storeDataSource.updateStore(storeId, data);
  }
}
