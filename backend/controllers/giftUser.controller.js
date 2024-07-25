
import GiftUserService from "../services/giftUser.services.js";
const GiftUserController = {
    createGiftUser: async (req, res) => {
        try {
            const userId = req.userId.id;
            const { giftId, description } = req.body;
            const result = await GiftUserService.createGiftUser({ userId, giftId, description });
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    deleteGiftUser: async (req, res) => {
        try {
            const userId = req.userId.id;
            const { giftId } = req.body;
            const result = await GiftUserService.deleteGiftUser({ userId, giftId });
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    getAllGiftOfUsers: async (req, res) => {
        try {
            const userId = req.userId.id;
            const result = await GiftUserService.getAllGiftOfUsers({ userId });
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    getAllUsersOfGift: async (req, res) => {
        try {
            const { giftId } = req.body;
            const result = await GiftUserService.getAllUsersOfGift({ giftId });

            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    getAllGiftDetails: async (req, res) => {
        try {
            const { is_gift_placed } = req.body;
            const result = await GiftUserService.getAllGiftDetails({ is_gift_placed });

            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
}

export default GiftUserController;