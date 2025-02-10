import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { IProductDataSource } from "../../domain/datasources";
import { IProductRepository } from "../../domain/repositories";
import { ProductEntity, UserEntity } from "../../domain/entities";

export class ProductsRepository implements IProductRepository {
  constructor(private readonly productDataSource: IProductDataSource) {}

  getProductById(id: number): Promise<ProductEntity | null> {
    return this.productDataSource.getProductById(id);
  }

  async getProducts(
    user: UserEntity,
    searchParam?: string,
    negocioId?: number
  ): Promise<ProductEntity[]> {
    return this.productDataSource.getProducts(searchParam, negocioId);
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
