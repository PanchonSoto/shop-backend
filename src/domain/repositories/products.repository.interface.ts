import { ProductEntity } from "../entities";
import { CreateProductDto } from '../dtos/products/create-product.dto';


export abstract class IProductRepository {


    abstract getProducts(): Promise<ProductEntity[]>

    abstract createProduct(createProductDto:CreateProductDto): Promise<ProductEntity>;

    abstract deleteProduct(id: number): Promise<void>;

    abstract updateProduct(ProductId: number, data: Partial<ProductEntity>): Promise<ProductEntity>;

}
