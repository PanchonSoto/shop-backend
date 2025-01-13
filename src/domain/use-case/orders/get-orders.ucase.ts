import { OrdersEntity } from '../../entities';
import { IOrdersRepository } from '../../repositories';







export class GetOrders {

    constructor(
        private readonly ordersRepository: IOrdersRepository,
    ){}

    async execute(): Promise<any[]> {
        const orders = await this.ordersRepository.getOrders();

        return orders;
    }

}
