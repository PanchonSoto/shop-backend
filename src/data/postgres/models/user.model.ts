import { DataTypes, Model } from "sequelize";
import { postgresDBInstance } from "../postgres-instance/postgres.instance";

const sequelize = postgresDBInstance.getSequelize();

export enum UserRole {
  NEGOCIO = "NEGOCIO",
  CLIENTE = "CLIENTE",
  ADMIN = "ADMIN",
}
interface UserInterface {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: UserRole | string;
  is_verified?: boolean;
}

interface UserModel extends Model<UserInterface>, UserInterface {}

export const UsersModel = sequelize.define<UserModel>(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
      validate: {
        isIn: [["NEGOCIO", "CLIENTE", "ADMIN"]],
      },
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // Other model options go here
    createdAt: false,
    updatedAt: false,
  }
);
