import { ProductEntity } from '../../entities';
import { IProductRepository } from '../../repositories';







export class UpdateProduct {

    constructor(
        private readonly productRepository: IProductRepository,
    ){}

    async execute(productId: number, data: Partial<ProductEntity>): Promise<ProductEntity> {
        return await this.productRepository.updateProduct(productId, data);
    }

}
