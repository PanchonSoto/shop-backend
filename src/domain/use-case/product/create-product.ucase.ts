import { CreateProductDto } from "../../dtos/products/create-product.dto";
import { CustomError } from "../../errors/custom.error";
import { IStoreRepository, IProductRepository } from "../../repositories";
import { ProductEntity, UserEntity } from "../../entities";

export class CreateProduct {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly storeRepository: IStoreRepository
  ) {}

  async execute(
    user: UserEntity,
    createProductDto: CreateProductDto
  ): Promise<ProductEntity> {
    const { id, store_id } = createProductDto;

    //! create a service to validate the following rules
    let storeId: number | null = null;
    if (user.role === "STORE") {
      const store = await this.storeRepository.getStoreByUser(user.id);
      if (!store)
        throw CustomError.notFound(`User's Store: "${user.id}" don't found.`);
      storeId = store.id;
    }

    // permissions
    if (user.role !== "ADMIN" && storeId !== store_id) {
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
    //   store_id: productCreated.store_id,
    //   price: productCreated.price,
    //   stock: productCreated.stock,
    // };
  }
}
