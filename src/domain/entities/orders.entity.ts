export class OrdersEntity {
  constructor(
    public store_id: number,
    public user_id: number,
    public status: "pending" | "processing" | "completed" | "cancelled",
    public subtotal: number,
    public tax: number,
    public total: number,
    public id?: number
  ) {}
}
