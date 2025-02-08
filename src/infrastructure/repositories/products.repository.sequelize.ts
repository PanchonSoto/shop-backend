import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import {
  INegocioDataSource,
  IProductDataSource,
} from "../../domain/datasources";
import { IProductRepository } from "../../domain/repositories";
import { ProductEntity, UserEntity } from "../../domain/entities";

export class ProductsRepository implements IProductRepository {
  constructor(
    private readonly productDataSource: IProductDataSource,
    private readonly negocioDataSource: INegocioDataSource
  ) {}

  getProductById(id: number): Promise<ProductEntity | null> {
    return this.productDataSource.getProductById(id);
  }

  async getProducts(
    user: UserEntity,
    searchParam?: string
  ): Promise<ProductEntity[]> {
    //! mover logica de negocio al use case

    // if user's role its "NEGOCIO" return its owns
    if (user.role === "NEGOCIO") {
      const userNegocio = await this.negocioDataSource.getNegocioByUser(
        user.id
      );
      return this.productDataSource.getProducts(searchParam, userNegocio.id);
    }
    // if user's role any other return all
    return this.productDataSource.getProducts(searchParam, undefined);
  }

  createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productDataSource.createProduct(createProductDto);
  }

  deleteProduct(id: number): Promise<void> {
    return this.productDataSource.deleteProduct(id);
  }

  updateProduct(
    ProductId: number,
    data: Partial<ProductEntity>
  ): Promise<ProductEntity> {
    return this.productDataSource.updateProduct(ProductId, data);
  }
}
