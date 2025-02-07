import { ProductEntity, UserEntity } from "../../entities";
import { IProductRepository, INegocioRepository } from "../../repositories";

import { CustomError } from "../../errors/custom.error";

export class UpdateProduct {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly negocioRepository: INegocioRepository
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

    let negocioId: number | null = null;
    if (user.role === "NEGOCIO") {
      const negocio = await this.negocioRepository.getNegocioByUser(user.id);
      if (!negocio)
        throw CustomError.notFound(`User's Negocio: "${user.id}" don't found.`);
      negocioId = negocio.id;
    }

    // permissions
    if (user.role !== "ADMIN" && Number(product.negocio_id) !== negocioId) {
      throw CustomError.forbidden(
        "Unauthorize you not have permission to do this action."
      );
    }

    // update
    return await this.productRepository.updateProduct(productId, data);
  }
}
