import { OrdersEntity } from '../../entities';
import { IOrdersRepository } from '../../repositories';







export class UpdateOrder {

    constructor(
        private readonly ordersRepository: IOrdersRepository,
    ){}

    async execute(orderId: number, data: Partial<OrdersEntity>): Promise<OrdersEntity> {
        return await this.ordersRepository.updateOrder(orderId, data);
    }

}
