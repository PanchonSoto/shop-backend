import { DataTypes, Model } from "sequelize";
import { postgresDBInstance } from "../postgres-instance/postgres.instance";
import { OrdersModel } from "./orders.model";
import { OrderItemModel } from "./order-items.model";


const sequelize = postgresDBInstance.getSequelize();



interface ProductInterface {
  id?: number;
  negocio_id: string;
  name: string;
  stock: number;
  price: number;
  available: boolean;
}

interface ProductModel extends Model<ProductInterface>, ProductInterface {}

export const ProductModel = sequelize.define<ProductModel>(
    'products',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      negocio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Negocios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
);


OrdersModel.belongsToMany(ProductModel, {
  through: 'order_products',
  foreignKey: 'order_id',
  otherKey: 'product_id',
  as: 'products',
});


ProductModel.belongsToMany(OrdersModel, {
  through: 'order_products',
  foreignKey: 'product_id',
  otherKey: 'order_id',
  as: 'orders',
});

OrderItemModel.belongsTo(ProductModel, { foreignKey: 'product_id' });

