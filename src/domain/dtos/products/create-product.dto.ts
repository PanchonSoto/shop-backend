export class CreateProductDto {
  private constructor(
    public store_id: number,
    public name: string,
    public stock: number,
    public price: number,
    public available: boolean,
    public id?: number
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string[]?, CreateProductDto?] {
    const { store_id, name, stock, price, available } = object;
    const errors = [];

    // if (!name) return ['name is required'];
    // if (!store_id) return ['store_id is required'];
    // if (!stock) return ['stock is required'];

    if (!store_id) {
      errors.push("store_id is required");
    } else if (typeof store_id !== "number") {
      errors.push("store_id must be a valid id");
    }

    if (!name) {
      errors.push("name is required");
    } else if (typeof name !== "string") {
      errors.push("name must be a string");
    } else if (name.length < 3) {
      errors.push("name must be at least 3 characters long");
    } else if (name.length > 100) {
      errors.push("name must be less than 100 characters long");
    }

    if (stock === undefined || stock === null) {
      errors.push("stock is required");
    } else if (!Number.isInteger(stock) || stock < 0) {
      errors.push("stock must be a non-negative integer");
    }

    if (price === undefined || price === null) {
      errors.push("price is required");
    } else if (typeof price !== "number" || price < 0) {
      errors.push("price must be a positive number");
    } else if (!/^\d+(\.\d{1,2})?$/.test(price.toString())) {
      errors.push("price can have up to two decimal places");
    }

    if (available === undefined || available === null) {
      errors.push("available is required");
    } else if (typeof available !== "boolean") {
      errors.push("available must be a boolean");
    }

    if (errors.length > 0)
      return [
        errors,
        new CreateProductDto(store_id, name, stock, price, available),
      ];
    return [[], new CreateProductDto(store_id, name, stock, price, available)];
  }
}
