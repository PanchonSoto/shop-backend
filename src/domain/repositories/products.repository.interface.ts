import { ProductEntity, UserEntity } from "../entities";
import { CreateProductDto } from "../dtos/products/create-product.dto";

export abstract class IProductRepository {
  abstract getProductById(id: number): Promise<ProductEntity | null>;

  abstract getProducts(
    user: UserEntity,
    searchParam?: string,
    negocioId?: number
  ): Promise<ProductEntity[]>;

  abstract createProduct(
    createProductDto: CreateProductDto
  ): Promise<ProductEntity>;

  abstract deleteProduct(id: number): Promise<void>;

  abstract updateProduct(
    ProductId: number,
    data: Partial<ProductEntity>
  ): Promise<ProductEntity>;
}
