import { CustomError } from "../../errors/custom.error";
import { IProductRepository } from "../../repositories";
import { ProductEntity } from "../../entities";

export class GetProducts {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.getProductById(id);

    if (!product)
      throw CustomError.notFound(`Product with id:'${id}' does not exists.`);

    return product;
  }
}
