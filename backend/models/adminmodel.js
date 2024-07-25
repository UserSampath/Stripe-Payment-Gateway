import sequelize from "../config/db.connection.js";
import { DataTypes } from "sequelize";

export const Admin = sequelize.define(
    "Admin",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    },
    {
        tableName: "Admin",
    }
);