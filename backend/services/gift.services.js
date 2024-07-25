import giftRepo from "../repositories/gift.repo.js";

const giftService = {
    createGift: async ({ name, creditCount, isPhysicalGift, image, description }) => {
        try {

            const result = await giftRepo.createGift({ name, creditCount, isPhysicalGift, image, description });
            if (result) {
                return { status: true, message: "Gift created successfully", result }
            } else {
                return { status: false, message: "Gift create failed!" }

            }
        } catch (error) {
            throw error;
        }

    },

    getAllGifts: async () => {
        try {
            const result = await giftRepo.getAllGift();
            if (result) {
                return { status: true, message: "Gift get successfully", result }
            } else {
                return { status: false, message: "Gift get failed" }
            }
        } catch (error) {
            throw error;
        }
    },
    getGiftById: async ({ id }) => {
        try {
            const meeting = await giftRepo.getGiftsById({ id });
            if (meeting) {
                return {
                    status: true,
                    message: "Gift get successfully",
                    result: meeting,
                }
            } else {
                return { status: false, message: "Gift getting failed!" }
            }
        } catch (error) {
            throw error;
        }
    },
    updateGift: async ({ id, name, creditCount, isPhysicalGift, image, description }) => {
        try {
            const result = await giftRepo.updateGift({ id, name, creditCount, isPhysicalGift, image, description });
            if (result) {
                return {
                    status: true,
                    message: "Gift updated successfully",
                    result
                }
            } else {
                return {
                    status: false,
                    message: "Gift not updated",
                }
            }
        } catch (error) {
            throw error;
        }
    },
    deleteGiftById: async ({ id }) => {
        try {
            const result = await giftRepo.deleteGiftById({ id });
            if (result > 0) {
                return {
                    status: true,
                    message: "Gift delete successfully",
                }
            } else {
                return {
                    status: false,
                    message: "Gift delete failed",
                }
            }
                
            
        } catch (error) {
            throw error;
        }
    },
}
export default giftService;