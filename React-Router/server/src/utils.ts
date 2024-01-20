import "dotenv/config";
import Stripe from "stripe";

const stripeConfig = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: "2023-10-16",
});

export default stripeConfig;
