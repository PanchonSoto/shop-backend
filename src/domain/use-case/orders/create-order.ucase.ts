import { OrdersEntity } from '../../entities';
import { IOrdersRepository } from '../../repositories';
import { CreateOrderDto } from '../../dtos/orders/create-order.dto';



export class CreateOrder {

    constructor(
        private readonly orderRepository: IOrdersRepository,
    ){}

    async execute(createOrderDto: CreateOrderDto): Promise<Partial<OrdersEntity>> {

        const orderCreated = await this.orderRepository.createOrder(createOrderDto);


        return {
            ...orderCreated
        }
        // return {
        //     id: orderCreated.id,
        //     negocio_id:orderCreated.negocio_id,
        //     status:orderCreated.status,
        //     subtotal:orderCreated.subtotal,
        //     tax:orderCreated.tax,
        //     total:orderCreated.total,
        //     user_id:orderCreated.user_id,
        // }

    }

}
