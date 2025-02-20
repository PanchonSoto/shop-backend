import { ProductEntity } from "../entities";
import { CreateProductDto } from "../dtos/products/create-product.dto";

export abstract class IProductDataSource {
  abstract getProductById(id: number): Promise<ProductEntity | null>;

  abstract getProducts(
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
