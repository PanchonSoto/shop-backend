import { CreateOrderDto } from './../../domain/dtos/orders/create-order.dto';
import { IOrdersDataSource } from "../../domain/datasources";
import { OrdersEntity } from "../../domain/entities";
import { IOrdersRepository } from "../../domain/repositories";





export class OrdersRepository implements IOrdersRepository {


    constructor(
        private readonly ordersDataSource: IOrdersDataSource
    ) {}



    getOrders(): Promise<any[]> {
        return this.ordersDataSource.getOrders();
    }

    createOrder(createOrderDto: CreateOrderDto): Promise<Partial<OrdersEntity>> {
        return this.ordersDataSource.createOrder(createOrderDto);
    }

    deleteOrder(id: number): Promise<void> {
        return this.ordersDataSource.deleteOrder(id);
    }

    updateOrder(orderId: number, data: Partial<OrdersEntity>): Promise<OrdersEntity> {
        return this.ordersDataSource.updateOrder(orderId, data);
    }



}
