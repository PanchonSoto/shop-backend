import { StoreEntity } from "../entities";

export abstract class IStoreDataSource {
  abstract verifyStoreExists(storeId?: number, name?: string): Promise<number>;

  abstract getStores(): Promise<StoreEntity[]>;

  abstract getStoreByUser(userId: number): Promise<StoreEntity | null>;

  abstract createStore(userId: number, name: string): Promise<StoreEntity>;

  abstract deleteStore(id: number): Promise<void>;

  abstract updateStore(
    storeId: number,
    data: Partial<StoreEntity>
  ): Promise<StoreEntity>;
}
