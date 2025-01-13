import { ProductEntity } from '../../entities';
import { IProductRepository } from '../../repositories';







export class GetProducts {

    constructor(
        private readonly productRepository: IProductRepository,
    ){}

    async execute(): Promise<ProductEntity[]> {
        const negocios = await this.productRepository.getProducts();

        return negocios;
    }

}
