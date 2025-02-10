import { ProductEntity, UserEntity } from "../../entities";
import { CustomError } from "../../errors/custom.error";
import { INegocioRepository, IProductRepository } from "../../repositories";

export class GetProducts {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly negocioRepository: INegocioRepository
  ) {}

  async execute(
    user: UserEntity,
    searchParam?: string
  ): Promise<ProductEntity[]> {
    //validate if user its a negocio
    if (user.role === "NEGOCIO") {
      const negocio = await this.negocioRepository.getNegocioByUser(user.id);

      if (!negocio)
        throw CustomError.notFound(
          `User's: ${user.id} negocio does not exists.`
        );
      //if negocio found send its id to return its owns products
      return await this.productRepository.getProducts(
        user,
        searchParam,
        negocio.id
      );
    }
    //if not return all products (client user or admin)
    return await this.productRepository.getProducts(user, searchParam);
  }
}
