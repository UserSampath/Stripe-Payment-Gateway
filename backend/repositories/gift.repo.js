import { Gift } from "../models/gift.model.js"
import sequelize from "../config/db.connection.js"
import * as fireBaseService from "../services/firebase.service.js";
import { GiftUser } from "../models/giftUser.model.js";

const giftRepo = {
    createGift: async ({ name, creditCount, isPhysicalGift, image, description }) => {
        try {
            let imageUrl;
            if (image) {

                const file = await fireBaseService.uploadFileToStorage(image, "gift");
                if (file.status) {
                    imageUrl = file.data;
                }
            }
            await sequelize.sync();
            const result = await Gift.create({ name, creditCount, isPhysicalGift, image: imageUrl, description });
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAllGift: async () => {
        try {
            const result = await Gift.findAll({
            });

            return result;

        } catch (error) {
            throw error;
        }
    },


    getGiftsById: async ({ id }) => {
        try {
            const result = await Gift.findOne({
                where: {
                    id
                },
            });
            return result;
        } catch (error) {
            throw error;

        }
    },

    updateGift: async ({ id, name, creditCount, isPhysicalGift, image, description }) => {
        try {

            let imageUrl;
            if (image) {

                const file = await fireBaseService.uploadFileToStorage(image, "gift");
                if (file.status) {
                    imageUrl = file.data;
                }
            }
            const result = await Gift.update({
                name, creditCount, isPhysicalGift, image: imageUrl, description
            }, { where: { id } });
            if (result > 0) {
                const updatedGift = await Gift.findByPk(id);
                return updatedGift;
            }
        } catch (error) {
            throw error;
        }
    },

    deleteGiftById: async ({ id }) => {
        try {
            const result = await Gift.destroy({
                where: {
                    id
                }
            })
            return result;
        } catch (error) {
            throw error;
        }
    },

}

export default giftRepo;