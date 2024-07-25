import sequelize from "../config/db.connection.js";
import { DataTypes } from "sequelize";

export const Gift = sequelize.define(
    "Gift",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creditCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isPhysicalGift: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING(2048),
            allowNull: false,
        },
       
    },
    {
        tableName: "gift",
        timestamps: true,
    }
);

