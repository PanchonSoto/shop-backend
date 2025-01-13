import { IOrdersRepository } from '../../repositories';







export class DeleteOrder {

    constructor(
        private readonly orderRepository: IOrdersRepository,
    ){}

    async execute(id: number): Promise<void> {
        await this.orderRepository.deleteOrder(id);
    }

}
