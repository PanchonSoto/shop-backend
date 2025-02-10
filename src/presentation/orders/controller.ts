import { Request, Response } from "express";

import { IOrdersRepository } from "../../domain/repositories";
import {
  CreateOrder,
  DeleteOrder,
  GetOrders,
  UpdateOrder,
} from "../../domain/use-case";

import { handleError } from "../../shared/handleError";
import { CreateOrderDto } from "../../domain/dtos/orders/create-order.dto";

interface OrderFields {
  store_id: number;
  user_id: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  subtotal: number;
  tax: number;
  total: number;
  id?: number;
}

export class OrdersController {
  constructor(private readonly orderRepository: IOrdersRepository) {}

  getOrders = (req: Request, res: Response) => {
    new GetOrders(this.orderRepository)
      .execute()
      .then((orders) => res.status(200).json(orders))
      .catch((error) => handleError(error, res));
  };

  createOrder = (req: Request, res: Response) => {
    const [error, createOrderDto] = CreateOrderDto.create(req.body);

    console.log("errr arr", error);
    if (error?.length) return res.status(400).json({ error });

    new CreateOrder(this.orderRepository)
      .execute(createOrderDto!)
      .then((order) => res.status(200).json(order))
      .catch((error) => handleError(error, res));
  };

  updateOrder = (req: Request, res: Response) => {
    const orderId = Number(req.params.orderId);

    if (isNaN(orderId)) {
      return res.status(400).json({ error: "Invalid id." });
    }

    const { store_id, user_id, status, subtotal, tax, total } = req.body;
    const validStatuses = ["pending", "refund", "completed", "cancelled"];

    const updateData: Partial<OrderFields> = {
      ...(user_id && { user_id }),
      ...(status && { status }),
      ...(store_id && { store_id }),
      ...(subtotal !== undefined && { subtotal }),
      ...(tax !== undefined && { tax }),
      ...(total !== undefined && { total }),
    };

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ error: "At least one field must be provided to update." });
    }
    if (updateData.status) {
      if (!validStatuses.includes(updateData.status)) {
        return res.status(400).json({
          error: "status must be: pending, refund, completed, cancelled ",
        });
      }
    }

    new UpdateOrder(this.orderRepository)
      .execute(orderId, updateData)
      .then((order) => res.status(200).json(order))
      .catch((error) => handleError(error, res));
  };

  deleteOrder = (req: Request, res: Response) => {
    const orderId = Number(req.params.orderId);

    if (!orderId)
      return res.sendStatus(400).json({ error: "orderId is required." });

    new DeleteOrder(this.orderRepository)
      .execute(orderId)
      .then(() => res.sendStatus(204))
      .catch((error) => handleError(error, res));
  };
}
