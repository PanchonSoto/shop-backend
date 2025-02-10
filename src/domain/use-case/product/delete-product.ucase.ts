import { CustomError } from "../../errors/custom.error";

import { IStoreRepository, IProductRepository } from "../../repositories";
import { UserEntity } from "../../entities";

export class DeleteProduct {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly storeRepository: IStoreRepository
  ) {}

  async execute(productId: number, user: UserEntity): Promise<void> {
    //! create a service to validate the following rules
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

    await this.productRepository.deleteProduct(productId);
  }
}
