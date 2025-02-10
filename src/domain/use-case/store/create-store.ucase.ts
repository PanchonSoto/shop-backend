import { StoreEntity } from "../../entities";
import { CustomError } from "../../errors/custom.error";
import { IStoreRepository } from "../../repositories";

export class CreateStore {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async execute(userId: number, name: string): Promise<StoreEntity> {
    const existStoreName = await this.storeRepository.verifyStoreExists(
      undefined,
      name
    );
    if (existStoreName)
      throw CustomError.badRequest(`Store with name ${name} already exists.`);

    const existUserStore = await this.storeRepository.getStoreByUser(userId);
    if (existUserStore)
      throw CustomError.badRequest(`User already have a Store.`);

    const store = await this.storeRepository.createStore(userId, name);

    return {
      id: store.id,
      name: store.name,
      user_id: store.user_id,
    };
  }
}
