import { OrdersEntity } from "../entities";
import { CreateOrderDto } from '../dtos/orders/create-order.dto';


export abstract class IOrdersRepository {


    abstract getOrders(): Promise<any[]>;

    abstract createOrder(createOrderDto:CreateOrderDto): Promise<Partial<OrdersEntity>>;

    abstract deleteOrder(id: number): Promise<void>;

    abstract updateOrder(orderId: number, data: Partial<OrdersEntity>): Promise<OrdersEntity>;

}
