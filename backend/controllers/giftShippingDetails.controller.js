import giftShippingDetailsService from "../services/giftShippingDetails.services.js";

const giftShippingDetailsController = {
    createGiftShippingDetails: async (req, res) => {
        try {
            const user_id = req.userId.id;
            const { country, city, zip_code, address, gift_id } = req.body;
            const result = await giftShippingDetailsService.createGiftShippingDetails({ country, city, zip_code, address, user_id,  gift_id });
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                });
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                });
            }
        } catch (error) {
            res.status(500).json({
                response_code: 500,
                status: false,
                error: error.message
            });
        }
    },

    getGiftShippingDetailsById: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await giftShippingDetailsService.getGiftShippingDetailsById({ id });
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                });
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                });
            }

        } catch (error) {
            console.error(error);
            res.status(400).json({
                response_code: 400,
                success: false, message: error.message
            });
        }


    },
    updateGiftShippingDetails: async (req, res) => {
        const { id, country, city, zip_code, address, gift_user_id, is_gift_placed } = req.body;
        try {
            const result = await giftShippingDetailsService.updateGiftShippingDetails({ id, country, city, zip_code, address, gift_user_id, is_gift_placed });
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                });
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                });
            }
        } catch (error) {
            res.status(500).json({
                response_code: 500,
                status: false,
                error: error.message
            });
        }
    },

    deleteGiftShippingDetailsById: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await giftShippingDetailsService.deleteGiftShippingDetailsById({ id });

            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    success: true,
                });

            } else {
                res.status(400).json({
                    response_code: 404,
                    success: false,
                });

            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                success: false, message: error.message,
            });
        }
    }
}

export default giftShippingDetailsController;