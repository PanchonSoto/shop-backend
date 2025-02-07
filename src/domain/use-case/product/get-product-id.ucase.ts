import { ProductEntity, UserEntity } from "../../entities";
import { IProductRepository } from "../../repositories";

export class GetProducts {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.getProductById(id);

    return product;
  }
}
