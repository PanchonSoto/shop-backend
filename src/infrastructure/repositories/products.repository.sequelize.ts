import { IProductDataSource } from "../../domain/datasources";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { ProductEntity } from "../../domain/entities";
import { IProductRepository } from "../../domain/repositories";





export class ProductsRepository implements IProductRepository {


    constructor(
        private readonly productDataSource: IProductDataSource
    ) {}


    getProducts(): Promise<ProductEntity[]> {
        return this.productDataSource.getProducts();
    }
    createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
        return this.productDataSource.createProduct(createProductDto);
    }
    deleteProduct(id: number): Promise<void> {
        return this.productDataSource.deleteProduct(id);
    }
    updateProduct(ProductId: number, data: Partial<ProductEntity>): Promise<ProductEntity> {
        return this.productDataSource.updateProduct(ProductId, data);
    }






}
