interface CartItems {
  price: number;
  product_id: number;
  quantity: number;
}

export class CreateOrderDto {
  private constructor(
    public store_id: number,
    public user_id: number,
    public status: "pending" | "processing" | "completed" | "cancelled",
    public cartItems: CartItems[],
    // public subtotal: number,
    // public tax: number,
    // public total: number,
    public id?: number
  ) {}

  static create(object: { [key: string]: any }): [string[]?, CreateOrderDto?] {
    const {
      store_id,
      user_id,
      status,
      subtotal,
      tax,
      total,
      cartItems = [],
    } = object;
    const errors: string[] = [];

    if (store_id === undefined || store_id === null) {
      errors.push("store_id is required");
    } else if (!Number.isInteger(store_id) || store_id <= 0) {
      errors.push("store_id must be a positive integer");
    }

    if (user_id === undefined || user_id === null) {
      errors.push("user_id is required");
    } else if (!Number.isInteger(user_id) || user_id <= 0) {
      errors.push("user_id must be a positive integer");
    }

    const validStatuses = ["pending", "processing", "completed", "cancelled"];
    if (!status) {
      errors.push("status is required");
    } else if (!validStatuses.includes(status)) {
      errors.push(`status must be one of: ${validStatuses.join(", ")}`);
    }

    // if (subtotal === undefined || subtotal === null) {
    //   errors.push('subtotal is required');
    // } else if (typeof subtotal !== 'number' || subtotal < 0) {
    //   errors.push('subtotal must be a positive number');
    // } else if (!/^\d+(\.\d{1,2})?$/.test(subtotal.toString())) {
    //   errors.push('subtotal can have up to two decimal places');
    // }

    // if (tax === undefined || tax === null) {
    //   errors.push('tax is required');
    // } else if (typeof tax !== 'number' || tax < 0) {
    //   errors.push('tax must be a positive number');
    // } else if (!/^\d+(\.\d{1,2})?$/.test(tax.toString())) {
    //   errors.push('tax can have up to two decimal places');
    // }

    //validate if array is empty
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      errors.push(
        "cartItems must not be empty. [{price:number, product_id:number, quantity:number}]"
      );
    }
    //cartItems validations
    for (const item of cartItems) {
      if (!item?.product_id) {
        errors.push("Each cart item must have an id property.");
      }
      if (!item?.quantity) {
        errors.push("Each cart item must have a quantity property.");
      }
    }

    if (errors.length > 0) {
      return [errors];
    }

    return [[], new CreateOrderDto(store_id, user_id, status, cartItems)];
  }
}
