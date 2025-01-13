import { DataTypes, Model } from "sequelize";
import { postgresDBInstance } from "../postgres-instance/postgres.instance";


const sequelize = postgresDBInstance.getSequelize();


export enum UserRole {
    NEGOCIO = 'NEGOCIO',
    CLIENTE = 'CLIENTE',
}
interface NegocioInterface {
    id?: number;
    name: string;
    user_id: number;
}

interface NegocioModel extends Model<NegocioInterface>, NegocioInterface {}

export const NegocioModel = sequelize.define<NegocioModel>(
    'Negocio',
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
      },
      {
        timestamps: false,
      }
);
