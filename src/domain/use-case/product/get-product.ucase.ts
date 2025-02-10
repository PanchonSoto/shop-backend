import { ProductEntity, UserEntity } from "../../entities";
import { CustomError } from "../../errors/custom.error";
import { IStoreRepository, IProductRepository } from "../../repositories";

export class GetProducts {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly storeRepository: IStoreRepository
  ) {}

  async execute(
    user: UserEntity,
    searchParam?: string
  ): Promise<ProductEntity[]> {
    //validate if user its a store
    if (user.role === "STORE") {
      const store = await this.storeRepository.getStoreByUser(user.id);

      if (!store)
        throw CustomError.notFound(`User's: ${user.id} store does not exists.`);
      //if store found send its id to return its owns products
      return await this.productRepository.getProducts(
        user,
        searchParam,
        store.id
      );
    }
    //if not return all products (client user or admin)
    return await this.productRepository.getProducts(user, searchParam);
  }
}
