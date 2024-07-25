import sequelize from "../config/db.connection.js";
import { DataTypes } from "sequelize";
import { User } from "../models/usermodel.js";
import { Gift } from "../models/gift.model.js";


export const GiftUser = sequelize.define(
    "GiftUser", {
    description: {
        type: DataTypes.STRING,
    },
}, { timestamps: false }
);

User.belongsToMany(Gift, { through: 'GiftUser' });
Gift.belongsToMany(User, { through: 'GiftUser' });