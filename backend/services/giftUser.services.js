import giftUserRepo from "./../repositories/giftUser.repo.js";
const GiftUserService = {
    createGiftUser: async ({ userId, giftId, description }) => {
        try {
            const result = await giftUserRepo.createGiftUser({ userId, giftId, description });
            if (result) {
                return { status: true, message: "Data saved successfully", result }
            }
            else {
                return { status: false, message: "Data saved failed!" }
            }
        } catch (error) {
            throw error;
        }
    },
    deleteGiftUser: async ({ userId, giftId }) => {
        try {
            const result = await giftUserRepo.deleteGiftUser({ userId, giftId });
            if (result) {
                return { status: true, message: "Data deleted successfully" }
            }
            else {
                return { status: false, message: "Data deleted failed!" }
            }
        } catch (error) {
            throw error;
        }
    },
    getAllGiftOfUsers: async ({ userId }) => {
        try {
            const result = await giftUserRepo.getAllGiftOfUsers({ userId });
            if (result) {
                return { status: true, message: "Data get successfully", result }
            }
            else {
                return { status: false, message: "Data get failed!" }
            }
        } catch (error) {
            throw error;
        }
    },
    getAllUsersOfGift: async ({ giftId }) => {
        try {
            const result = await giftUserRepo.getAllUsersOfGift({ giftId });
            if (result) {
                return { status: true, message: "Data get successfully", result }
            }
            else {
                return { status: false, message: "Data get failed!" }
            }
        } catch (error) {
            throw error;
        }
    },
    getAllGiftDetails: async ({ is_gift_placed }) => {
        try {
            const result = await giftUserRepo.getAllGiftDetails({ is_gift_placed });
            if (result) {
                return { status: true, message: "Data get successfully", result }
            }
            else {
                return { status: false, message: "Data get failed!" }
            }
        } catch (error) {
            throw error;
        }
    },

}
export default GiftUserService;