import { DataTypes, Model } from "sequelize";
import { postgresDBInstance } from "../postgres-instance/postgres.instance";

const sequelize = postgresDBInstance.getSequelize();

export enum UserRole {
  STORE = "STORE",
  CLIENTE = "CLIENTE",
}
interface StoreInterface {
  id?: number;
  name: string;
  user_id: number;
}

interface StoreModel extends Model<StoreInterface>, StoreInterface {}

export const StoreModel = sequelize.define<StoreModel>(
  "stores",
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
        model: "Users",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);
