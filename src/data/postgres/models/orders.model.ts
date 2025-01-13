import { DataTypes, Model, Optional } from "sequelize";
import { postgresDBInstance } from "../postgres-instance/postgres.instance";


const sequelize = postgresDBInstance.getSequelize();



interface OrdersAttributes {
  id?: number;
  negocio_id: number;
  user_id: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  subtotal: number;
  tax: number;
  total: number;
}


interface OrdersCreationAttributes extends Optional<OrdersAttributes, 'id'> {}


interface OrdersModel extends Model<OrdersAttributes, OrdersCreationAttributes>, OrdersAttributes {}


export const OrdersModel = sequelize.define<OrdersModel>(
  'orders',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    negocio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'refund', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: 'orders',
    timestamps: true,
    underscored: true,
  }
);
