import giftController from "../controllers/gift.controller.js";
import express from "express";
import adminAuthentication from "../middleware/adminAuthentication.js";
import upload from "../config/configMulter.js";
const router = express.Router();

router.post("/createGift", upload.single('image'), giftController.createGift);
router.get("/getGiftById/:id", giftController.getGiftById);
router.get("/getAllGifts", giftController.getAllGifts);
router.put("/updateGift", upload.single('image'), giftController.updateGift);
router.delete("/deleteGiftById/:id", giftController.deleteGiftById);

export default router;  