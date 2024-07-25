// import { User, GiftUser } from "./../models/model.js"
import { User } from "../models/usermodel.js";
import { Gift } from "../models/gift.model.js";
import { GiftUser } from "../models/giftUser.model.js";
import sequelize from "../config/db.connection.js"
import { Op } from "sequelize";
import { GiftShippingDetails } from "../models/giftShippingDetails.model.js";

const giftUserRepo = {
    createGiftUser: async ({ userId, giftId, description }) => {
        try {
            await sequelize.sync();
            const result = await GiftUser.create({
                UserId: userId, GiftId: giftId, description
            });
            return result;
        } catch (error) {
            throw error;
        }
    },
    deleteGiftUser: async ({ userId, giftId }) => {
        try {
            const isDeleted = await GiftUser.destroy({
                where: {
                    UserId: userId, GiftId: giftId
                },
            });
            return isDeleted === 1;
        } catch (error) {
            throw error;
        }
    },
    getAllGiftOfUsers: async ({ userId }) => {
        try {
            const result = await User.findByPk(userId, {
                attributes: [],
                include: [{
                    model: Gift,
                    through: {
                        model: GiftUser,
                    },
                }],
            });

            return result;
        } catch (error) {
            throw error;
        }
    },
    getAllUsersOfGift: async ({ giftId }) => {
        try {
            const result = await Gift.findByPk(giftId, {
                include: [{
                    model: User,
                    attributes: ["id", "email", "firstName", "lastName"],
                    through: {
                        model: GiftUser,
                    },
                    include: [{
                        model: GiftShippingDetails,
                        where: { gift_id: giftId },
                         required: false
                    }],
                }]
            });

            console.log('Detailed Result:', result);
            return result;
        } catch (error) {
            console.error('Error in getAllUsersOfGift:', error);
            throw error;
        }
    },
    getAllGiftDetails: async ({ is_gift_placed }) => {
        try {
            const result = await Gift.findAll({
                include: [{
                    model: User,
                    attributes: ["id", "email", "firstName", "lastName"],
                    through: {
                        model: GiftUser,
                    },
                    include: [{
                        model: GiftShippingDetails,
                        required: false
                    }],
                }]
            });

            console.log('Detailed Result:', result);
            return result;
        } catch (error) {
            console.error('Error in getAllUsersOfGift:', error);
            throw error;
        }
    }


}
export default giftUserRepo;