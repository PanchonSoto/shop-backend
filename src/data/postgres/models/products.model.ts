import { DataTypes, Model } from "sequelize";
import { postgresDBInstance } from "../postgres-instance/postgres.instance";


const sequelize = postgresDBInstance.getSequelize();



interface NegocioInterface {
  id?: number;
  negocio_id: string;
  name: string;
  stock: number;
  price: number;
  available: boolean;
}

interface NegocioModel extends Model<NegocioInterface>, NegocioInterface {}

export const NegocioModel = sequelize.define<NegocioModel>(
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
