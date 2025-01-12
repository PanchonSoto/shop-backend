import { DataTypes } from "sequelize";
import { postgresDBInstance } from "../postgres-instance/postgres.instance";


const sequelize = postgresDBInstance.getSequelize();

export const Users = sequelize.define(
    'Users',
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
              isIn: [['NEGOCIO', 'CLIENTE']],
            },
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        // Other model options go here
    },
);
