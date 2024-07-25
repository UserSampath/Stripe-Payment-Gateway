import giftService from "../services/gift.services.js";

const giftController = {
    createGift: async (req, res) => {
        try {
            const { name, creditCount, isPhysicalGift, description } = req.body;
            const image = req.file;
            const result = await giftService.createGift({ name, creditCount, isPhysicalGift, image, description });
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


    getAllGifts: async (req, res) => {
        try {

            const result = await giftService.getAllGifts();
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    success: true, result
                });
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                status: false,
                success: false, message: error.message
            });
        }
    },

    getGiftById: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await giftService.getGiftById({ id });
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
    updateGift: async (req, res) => {
        const { id, name, creditCount, isPhysicalGift, description } = req.body;
        const image = req.file;
        try {
            const result = await giftService.updateGift({ id, name, creditCount, isPhysicalGift, image, description });
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

    deleteGiftById: async (req, res) => {
        const id = req.params.id;

        try {
            const result = await giftService.deleteGiftById({ id });

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

export default giftController;