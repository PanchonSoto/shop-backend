import { ProductEntity, UserEntity } from "../../entities";
import { IProductRepository } from "../../repositories";

export class GetProducts {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(user: UserEntity): Promise<ProductEntity[]> {
    const products = await this.productRepository.getProducts(user);

    return products;
  }
}
