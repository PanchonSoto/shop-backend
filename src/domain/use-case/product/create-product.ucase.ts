import { CreateProductDto } from "../../dtos/products/create-product.dto";
import { CustomError } from "../../errors/custom.error";
import { INegocioRepository, IProductRepository } from "../../repositories";
import { ProductEntity, UserEntity } from "../../entities";

export class CreateProduct {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly negocioRepository: INegocioRepository
  ) {}

  async execute(
    user: UserEntity,
    createProductDto: CreateProductDto
  ): Promise<ProductEntity> {
    const { id, negocio_id } = createProductDto;

    //! create a service to validate the following rules
    let negocioId: number | null = null;
    if (user.role === "NEGOCIO") {
      const negocio = await this.negocioRepository.getNegocioByUser(user.id);
      if (!negocio)
        throw CustomError.notFound(`User's Negocio: "${user.id}" don't found.`);
      negocioId = negocio.id;
    }

    // permissions
    if (user.role !== "ADMIN" && negocioId !== negocio_id) {
      throw CustomError.forbidden(
        "Unauthorize you not have permission to do this action."
      );
    }

    return await this.productRepository.createProduct(createProductDto);

    // const productCreated =
    //   await this.productRepository.createProduct(createProductDto);

    // return {
    //   available: productCreated.available,
    //   id: productCreated.id,
    //   name: productCreated.name,
    //   negocio_id: productCreated.negocio_id,
    //   price: productCreated.price,
    //   stock: productCreated.stock,
    // };
  }
}
