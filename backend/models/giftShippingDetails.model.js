import sequelize from "../config/db.connection.js"
import { DataTypes } from "sequelize";
import { User } from "./usermodel.js";
import { Gift } from "./gift.model.js";
import { GiftUser } from "./giftUser.model.js";

export const GiftShippingDetails = sequelize.define(
    "GiftShippingDetails",
    {
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_gift_placed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: "giftShippingDetails",
    }
);

User.hasMany(GiftShippingDetails, {
    foreignKey: "user_id",
})
GiftShippingDetails.belongsTo(User, {
    foreignKey: "user_id",
});

// GiftUser.hasOne(GiftShippingDetails, {
//     foreignKey: "gift_user_id",
// })
// GiftShippingDetails.belongsTo(GiftUser, {
//     foreignKey: "gift_user_id",
// });

Gift.hasMany(GiftShippingDetails, {
    foreignKey: "gift_id",
})
GiftShippingDetails.belongsTo(Gift, {
    foreignKey: "gift_id",
});