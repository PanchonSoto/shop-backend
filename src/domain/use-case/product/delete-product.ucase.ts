import { IProductRepository } from '../../repositories';







export class DeleteProduct {

    constructor(
        private readonly productRepository: IProductRepository,
    ){}

    async execute(id: number): Promise<void> {
        await this.productRepository.deleteProduct(id);
    }

}
