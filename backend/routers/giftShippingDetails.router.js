import giftShippingDetailsController from "../controllers/giftShippingDetails.controller.js";
import userAuthentication from "../middleware/userAuthentication.js";
import express from "express";
const router = express.Router();

router.post("/createGiftShippingDetails", userAuthentication, giftShippingDetailsController.createGiftShippingDetails);
router.get("/getGiftShippingDetailsById/:id", giftShippingDetailsController.getGiftShippingDetailsById);
router.put("/updateGiftShippingDetails", giftShippingDetailsController.updateGiftShippingDetails);
router.delete("/deleteGiftShippingDetailsById/:id", giftShippingDetailsController.deleteGiftShippingDetailsById);

export default router;  