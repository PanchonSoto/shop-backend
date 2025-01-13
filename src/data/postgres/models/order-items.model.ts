import { DataTypes, Model } from 'sequelize';
import { postgresDBInstance } from "../postgres-instance/postgres.instance";

const sequelize = postgresDBInstance.getSequelize();


interface OrderItemAttributes {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

interface OrderItemInstance extends Model<OrderItemAttributes>, OrderItemAttributes {}

export const OrderItemModel = sequelize.define<OrderItemInstance>(
  'order_items',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
