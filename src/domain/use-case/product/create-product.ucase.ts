import { ProductEntity } from '../../entities';
import { IProductRepository } from '../../repositories';
import { CreateProductDto } from '../../dtos/products/create-product.dto';



export class CreateProduct {

    constructor(
        private readonly productRepository: IProductRepository,
    ){}

    async execute(createProductDto: CreateProductDto): Promise<ProductEntity> {

        const productCreated = await this.productRepository.createProduct(createProductDto);


        return {
            available: productCreated.available,
            id: productCreated.id,
            name: productCreated.name,
            negocio_id: productCreated.negocio_id,
            price: productCreated.price,
            stock: productCreated.stock,
        }

    }

}
