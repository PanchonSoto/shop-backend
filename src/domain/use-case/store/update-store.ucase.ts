import { StoreEntity, UserEntity } from "../../entities";
import { CustomError } from "../../errors/custom.error";
import { IStoreRepository } from "../../repositories";

export class UpdateStore {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async execute(
    user: UserEntity,
    storeId: number,
    data: Partial<StoreEntity>
  ): Promise<StoreEntity> {
    let userStoreId: number | null = null;
    if (user.role === "STORE") {
      const store = await this.storeRepository.getStoreByUser(user.id);
      if (!store)
        throw CustomError.notFound(`User's Store: "${user.id}" don't found.`);
      userStoreId = store.id;
    }

    // permissions
    if (user.role !== "ADMIN" && userStoreId !== storeId) {
      throw CustomError.forbidden(
        "Unauthorize you not have permission to do this action."
      );
    }

    return await this.storeRepository.updateStore(storeId, data);
  }
}
