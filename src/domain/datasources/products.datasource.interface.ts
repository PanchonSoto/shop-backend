import { ProductEntity } from "../entities";
import { CreateProductDto } from "../dtos/products/create-product.dto";

export abstract class IProductDataSource {
  abstract getProducts(): Promise<ProductEntity[]>;

  abstract getProductsByNegocio(negocioId: number): Promise<ProductEntity[]>;

  abstract createProduct(
    createProductDto: CreateProductDto
  ): Promise<ProductEntity>;

  abstract deleteProduct(id: number): Promise<void>;

  abstract updateProduct(
    ProductId: number,
    data: Partial<ProductEntity>
  ): Promise<ProductEntity>;
}
