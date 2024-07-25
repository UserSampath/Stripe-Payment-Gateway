import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/db.connection.js";
import userRoutes from "./routers/user.router.js"
// import adminRoutes from "./routers/admin.router.js"
// import videoRoutes from "./routers/video.router.js"
// import productRoutes from './routers/product.route.js';
// import giftRoutes from './routers/gift.router.js';
// import giftUserRoutes from './routers/giftUser.router.js';
// import giftShippingDetailsRoutes from './routers/giftShippingDetails.router.js';
import stripeRoutes from './routers/stripe.route.js';
import Stripe from "stripe";

const app = express();
const PORT = process.env.PORT || 8088;
app.use(cors());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
    "Content-Type: multipart/form-data"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

//connect database
sequelize
  .authenticate()
  .then(() => {
    console.log("connection has been established successfully");
  })
  .catch((error) => {
    console.error("unable connect to the database: ", error);
  });
//Table creation
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("tables created");
  })
  .catch((error) => {
    console.error("unable to create tables: ", error);
  });

const endpointSecret = "whsec_c872b11c9146f0715a1f7a1f00f186e91e7a5b2185506f1b8baf35385ef85980";
const stripe = new Stripe(process.env.STRIPE_SECRET);
app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = Stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    // const data=event.data.object
  } catch (err) {
    console.log("🚀 ~ app.post ~ err:", err)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log("🚀 ~ app.post ~ paymentIntentSucceeded:", paymentIntentSucceeded)
      stripe.customers.retrieve(paymentIntentSucceeded.customer).then((customer) => {
        console.log("🚀 ~ stripe.customers.retrieve ~ customer:", customer)
      }).catch((error) => {
        console.log("🚀 ~ stripe.customers.retrieve ~ error:", error)

      })

      break;
    
    case 'checkout.session.completed':
      console.log("checkout.session.completed")

      break;
    case 'invoice.paid':
      console.log("invoice.paid")
      break;
    case 'invoice.payment_failed':
      console.log("invoice.payment_failed")
      break;
    case 'customer.subscription.updated':
      console.log("customer.subscription.updated")
      break;
    case 'payment_intent.payment_failed':
      const paymentIntentFailed = event.data.object;
      // console.log("Payment Intent Failed:", paymentIntentFailed);
      const error = paymentIntentFailed.last_payment_error;
      // console.log("🚀 ~ app.post ~ error:", error)
      if (error) {
        switch (error.type) {
          case 'card_error':
            console.log(`🚀 A payment error occurred: ${error.message}`);
            break;
          case 'invalid_request_error':
            console.log('An invalid request occurred.');
            if (error.param) {
              console.log(`The parameter ${error.param} is invalid or missing.`);
            }
            break;
          default:
            console.log('Another problem occurred, maybe unrelated to Stripe.');
            break;
        }
      }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  response.status(200).end();
});

app.use(bodyParser.json());
app.use('/payment', stripeRoutes);
app.use('/user', userRoutes);



//run server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

