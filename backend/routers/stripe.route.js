import express from "express";
import * as stripeController from "../controllers/stripe.controller.js";

const router = express.Router();

router.post("/crete-checkout-session", stripeController.addStripe);
router.post("/crete-checkout-session-sub", stripeController.addStripeForSubscription);
router.post("/customerPortal", stripeController.myPlan);



export default router;
