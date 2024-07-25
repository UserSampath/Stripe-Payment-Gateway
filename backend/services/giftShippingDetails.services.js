import giftShippingDetailsRepo from "../repositories/giftShippingDetails.repo.js";

const giftShippingDetailsService = {
    createGiftShippingDetails: async ({ country, city, zip_code, address, user_id, gift_id }) => {
        try {
            const result = await giftShippingDetailsRepo.createGiftShippingDetails({ country, city, zip_code, address, user_id, gift_id });
            if (result) {
                return { status: true, message: "Data saved successfully", result }
            } else {
                return { status: false, message: "Data save failed!" }

            }
        } catch (error) {
            throw error;
        }

    },
    getGiftShippingDetailsById: async ({ id }) => {
        try {
            const result = await giftShippingDetailsRepo.getGiftShippingDetailsById({ id });
            if (result) {
                return {
                    status: true,
                    message: "Data get successfully",
                    result,
                }
            } else {
                return { status: false, message: "Data getting failed!" }
            }
        } catch (error) {
            throw error;
        }
    },
    updateGiftShippingDetails: async ({ id, country, city, zip_code, address, gift_user_id, is_gift_placed }) => {
        try {
            const result = await giftShippingDetailsRepo.updateGiftShippingDetails({ id, country, city, zip_code, address, gift_user_id, is_gift_placed });
            if (result) {
                return {
                    status: true,
                    message: "Data updated successfully",
                    result
                }
            } else {
                return {
                    status: false,
                    message: "Data not updated",
                }
            }
        } catch (error) {
            throw error;
        }
    },
    deleteGiftShippingDetailsById: async ({ id }) => {
        try {
            const result = await giftShippingDetailsRepo.deleteGiftShippingDetailsById({ id });
            if (result > 0) {
                return {
                    status: true,
                    message: "Data delete successfully",
                }
            } else {
                return {
                    status: false,
                    message: "Data delete failed",
                }
            }


        } catch (error) {
            throw error;
        }
    },
}
export default giftShippingDetailsService;