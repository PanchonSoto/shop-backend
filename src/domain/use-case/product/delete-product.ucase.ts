import { CustomError } from "../../errors/custom.error";

import { INegocioRepository, IProductRepository } from "../../repositories";
import { UserEntity } from "../../entities";

export class DeleteProduct {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly negocioRepository: INegocioRepository
  ) {}

  async execute(productId: number, user: UserEntity): Promise<void> {
    //! create a service to validate the following rules
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

    await this.productRepository.deleteProduct(productId);
  }
}
