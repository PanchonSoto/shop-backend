import { CustomError } from "../../errors/custom.error";
import { IStoreRepository } from "../../repositories";
import { StoreEntity } from "../../entities";

export class GetStoreByUser {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async execute(userId: number): Promise<StoreEntity> {
    const store = await this.storeRepository.getStoreByUser(userId);

    if (!store)
      throw CustomError.notFound(`User's store ${userId} does not exists.`);

    return store;
  }
}
