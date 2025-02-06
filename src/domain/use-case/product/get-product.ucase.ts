import { ProductEntity, UserEntity } from "../../entities";
import { IProductRepository } from "../../repositories";

export class GetProducts {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    user: UserEntity,
    searchParam?: string
  ): Promise<ProductEntity[]> {
    const products = await this.productRepository.getProducts(
      user,
      searchParam
    );

    return products;
  }
}
