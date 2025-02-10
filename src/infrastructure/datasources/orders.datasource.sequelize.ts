import { CustomError } from "../../domain/errors/custom.error";
import { IOrdersDataSource } from "../../domain/datasources";
import { OrdersEntity, ProductEntity } from "../../domain/entities";

import { ProductModel } from "../../data/postgres/models/products.model";
import { StoreModel } from "../../data/postgres/models/store.model";
import { CreateOrderDto } from "../../domain/dtos/orders/create-order.dto";
import { OrdersModel } from "../../data/postgres/models/orders.model";
import { OrderItemModel } from "../../data/postgres/models/order-items.model";
import { UsersModel } from "../../data/postgres/models/user.model";

export class OrdersDataSource implements IOrdersDataSource {
  constructor() {}

  async getOrders(): Promise<OrdersEntity[]> {
    try {
      const orders = await OrdersModel.findAll({
        //!todo filtrar ordenes por usuario
        // where: { user_id: user.id },
        include: [
          {
            model: OrderItemModel,
            as: "items",
            include: [
              {
                model: ProductModel,
                as: "product",
                attributes: ["name", "price"],
              },
            ],
          },
        ],
      });

      return orders;

      // return orders.map(order => new OrdersEntity(
      //     product.id!,
      //     product.store_id,
      //     product.name,
      //     product.stock,
      //     product.price,
      //     product.available,
      // ));
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw error;
      }

      throw CustomError.interlServerError();
    }
  }

  async createOrder(
    createOrderDto: CreateOrderDto
  ): Promise<Partial<OrdersEntity>> {
    const { store_id, status, user_id, cartItems } = createOrderDto;

    try {
      const existStore = await StoreModel.count({
        where: { id: store_id },
      });
      if (existStore === 0)
        throw CustomError.badRequest("Store does not exists");
      const existUser = await UsersModel.count({
        where: { id: user_id },
      });
      if (existUser === 0) throw CustomError.badRequest("User does not exists");

      //calcular tax, subtotal y total
      const totalPriceCart = parseFloat(
        cartItems
          .reduce(
            (total, product) => total + product.price * product.quantity,
            0
          )
          .toFixed(2)
      );
      const tax_rate = 0.15;
      const tax = totalPriceCart * tax_rate;
      const totalWithTax = totalPriceCart + tax;

      const createdOrder = await OrdersModel.create({
        store_id,
        status,
        subtotal: totalPriceCart,
        tax: tax,
        total: totalWithTax,
        user_id,
      });

      const orderItems = createOrderDto.cartItems.map((product) => ({
        order_id: createdOrder.id!,
        product_id: product.product_id,
        quantity: product.quantity,
        price: product.price,
      }));

      const order_items = await OrderItemModel.bulkCreate(orderItems);

      const orderEntity = new OrdersEntity(
        createdOrder.store_id,
        createdOrder.user_id,
        createdOrder.status,
        createdOrder.tax,
        createdOrder.tax,
        createdOrder.total
      );

      return {
        ...orderEntity,
        ...order_items,
      };
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw error;
      }

      throw CustomError.interlServerError();
    }
  }

  async deleteOrder(id: number): Promise<void> {
    try {
      const orders = await OrdersModel.findByPk(id);

      if (!orders) {
        throw CustomError.badRequest("order does not exist.");
      }

      await orders.destroy();
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw error;
      }

      throw CustomError.interlServerError();
    }
  }

  async updateOrder(
    orderId: number,
    data: Partial<OrdersEntity>
  ): Promise<OrdersEntity> {
    try {
      const [updatedRows, [updatedOrder]] = await OrdersModel.update(data, {
        where: { id: orderId },
        returning: true,
      });

      if (updatedRows === 0) {
        throw CustomError.notFound("Order does not exist.");
      }

      return new OrdersEntity(
        updatedOrder.store_id,
        updatedOrder.user_id,
        updatedOrder.status,
        updatedOrder.subtotal,
        updatedOrder.tax,
        updatedOrder.total
      );
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw error;
      }

      throw CustomError.interlServerError();
    }
  }
}
