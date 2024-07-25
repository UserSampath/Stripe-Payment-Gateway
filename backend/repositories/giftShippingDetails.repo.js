import { GiftShippingDetails } from "../models/giftShippingDetails.model.js"
import sequelize from "../config/db.connection.js"

const giftShippingDetailsRepo = {
    createGiftShippingDetails: async ({ country, city, zip_code, address, user_id, gift_id }) => {
        try {
            await sequelize.sync();
            const giftShippingDetails = await GiftShippingDetails.findOne({ where: { user_id, gift_id } })
            if (giftShippingDetails) {
                throw new Error("Gift shipping details already exists");
            }
            const result = await GiftShippingDetails.create({ country, city, zip_code, address, user_id, gift_id });
            return result;
        } catch (error) {
            throw error;
        }
    },

    getGiftShippingDetailsById: async ({ id }) => {
        try {
            const result = await GiftShippingDetails.findOne({
                where: {
                    id
                },
            });
            return result;
        } catch (error) {
            throw error;

        }
    },

    updateGiftShippingDetails: async ({ id, country, city, zip_code, address, gift_user_id, is_gift_placed }) => {
        try {
            const result = await GiftShippingDetails.update({
                country, city, zip_code, address, gift_user_id, is_gift_placed
            }, { where: { id } });
            if (result > 0) {
                const updatedGift = await GiftShippingDetails.findByPk(id);
                return updatedGift;
            }
        } catch (error) {
            throw error;
        }
    },

    deleteGiftShippingDetailsById: async ({ id }) => {
        try {
            const result = await GiftShippingDetails.destroy({
                where: {
                    id
                }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default giftShippingDetailsRepo;