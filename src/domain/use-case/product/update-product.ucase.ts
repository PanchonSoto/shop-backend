import { ProductEntity, UserEntity } from "../../entities";
import { IProductRepository, IStoreRepository } from "../../repositories";

import { CustomError } from "../../errors/custom.error";

export class UpdateProduct {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly storeRepository: IStoreRepository
  ) {}

  async execute(
    user: UserEntity,
    productId: number,
    data: Partial<ProductEntity>
  ): Promise<ProductEntity> {
    //! create a service to validate the following rules
    // obtain product
    const product = await this.productRepository.getProductById(productId);
    if (!product)
      throw CustomError.notFound(`Product: "${productId}" don't found.`);

    let storeId: number | null = null;
    if (user.role === "STORE") {
      const store = await this.storeRepository.getStoreByUser(user.id);
      if (!store)
        throw CustomError.notFound(`User's Store: "${user.id}" don't found.`);
      storeId = store.id;
    }

    // permissions
    if (user.role !== "ADMIN" && Number(product.store_id) !== storeId) {
      throw CustomError.forbidden(
        "Unauthorize you not have permission to do this action."
      );
    }

    // update
    return await this.productRepository.updateProduct(productId, data);
  }
}
