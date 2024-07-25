import Stripe from "stripe";
import { v4 as uuidv4 } from 'uuid';
import userService from "./../services/user.services.js"
import { User } from "../models/usermodel.js";

export const addStripe = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET);
    const { products } = req.body;

    const user = await userService.getUserById(3)
    let customer;
    if (user.stripeCustomerId===null) {
      customer = await stripe.customers.create({
        metadata: {
          userId: String(user.id),
        }
      });
      await User.update({
        stripeCustomerId: customer.id
      }, { where: { id: user.id } }
      );
    } else {
      customer = await stripe.customers.retrieve(user.stripeCustomerId); 
    }
    console.log("🚀 ~ addStripe ~ customer:", customer)
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));
    const idempotencyKey = uuidv4();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.SITE_URL}/SuccessPage`,
      cancel_url: `${process.env.SITE_URL}/cart`,
    }, { idempotencyKey });
    console.log("Payment", session);
    // console.log("🚀 ~ addStripe ~ session:", session.id)

    res.json({ id: session.id });
  } catch (error) {
    console.log("error:", error)
    res.status(500).json({ error: error.message });
  }
};


export const addStripeForSubscription = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET);
    const plan=req.body.type
    let priceId;
    if (plan == "starter") {
      priceId ="price_1Pg1ANLfF5C2F9EbecbhUIUE"
      
    } else {
      priceId = "price_1Pg1AxLfF5C2F9Eb7aQ7FDxX"

    }

    const user = await userService.getUserById(3)
    let customer;
    if (user.stripeCustomerId === null) {
      customer = await stripe.customers.create({
        metadata: {
          userId: String(user.id),
        }
      });
      await User.update({
        stripeCustomerId: customer.id
      }, { where: { id: user.id } }
      );
    } else {
      customer = await stripe.customers.retrieve(user.stripeCustomerId);
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Pro',
          },
          unit_amount: Math.round(30 * 100),
          recurring: {
            interval: 'day',
          },
        },
        quantity: 1,
      }],
      success_url: `${process.env.SITE_URL}/SuccessPage`,
      cancel_url: `${process.env.SITE_URL}/cart`,
    })
    console.log("🚀 ~ addStripeForSubscription ~ session:", session)
    res.json({ id: session.id });
  } catch (error) {
    console.log("error:", error)
    res.status(500).json({ error: error.message });
  }
};

export const myPlan = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET);

  try {
    const user = await userService.getUserById(3)
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.SITE_URL}/`,
    })
    console.log("🚀 ~ myPlan ~ portalSession:", portalSession.url)
    res.json({ id: portalSession.id, url: portalSession.url });
  } catch (error) {
    console.log("error:", error)
    res.status(500).json({ error: error.message });
  }
};