import express from "express";
const router = express.Router();
import GiftUserController from "../controllers/giftUser.controller.js";
import adminAuthentication from "../middleware/adminAuthentication.js";
import userAuthentication from "../middleware/userAuthentication.js";

router.post("/createGiftUser", userAuthentication, GiftUserController.createGiftUser);
router.delete("/deleteGiftUser", userAuthentication, GiftUserController.deleteGiftUser);
router.get("/getAllGiftOfUsers", userAuthentication, GiftUserController.getAllGiftOfUsers);
router.get("/getAllUsersOfGift", userAuthentication, GiftUserController.getAllUsersOfGift);
router.get("/getAllGiftDetails", userAuthentication, GiftUserController.getAllGiftDetails);


export default router;  