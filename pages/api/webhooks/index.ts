import axios, { AxiosRequestConfig } from "axios";
import { buffer } from "micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      // On error, log and return the error message.
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    // Cast event data to Stripe object.
    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      updateSubscription(subscription);
      console.log(`Subscription updated: ${subscription.id}`);
    } else if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;
      console.log(`💵 Charge id: ${charge.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////
// TODO: Split this up into a separate file and only import the part that we need for the webhook
/////////////////////////////////////////////////////////////////////////////////////////////////

const auth0Token = function auth0Token() {
  // For testing, we return a pre-built token.
  // TODO: Generate dynamic token request and return that instead.
  return process.env.AUTH0_MGMT_API_TOKEN;
};

const Auth0UserFromEmail = async function Auth0UserFromEmail(
  email: string
): Promise<string> {
  let user = "";
  var options: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.AUTH0_MGMT_API_URL}/users-by-email`,
    params: { email: email },
    headers: { authorization: "Bearer " + auth0Token() },
  };
  return await axios
    .request(options)
    .then(function (response) {
      user = response.data.user_id;
      return user;
    })
    .catch(function (error) {
      console.error(error);
      return error;
    });
};

const updateSubscription = async function updateSubscription(
  subscription: Stripe.Subscription
) {
  // Get Auth0 ID that matches sub customer's email address
  let Auth0User = "";
  return await stripe.customers
    .retrieve(subscription.customer)
    .then(async (customer) => {
      return await Auth0UserFromEmail(customer.email);
    })
    .then((auth0User) => {
      const options: AxiosRequestConfig = {
        method: "POST",
        url: `${process.env.AUTH0_MGMT_API_URL}/users/${auth0User}/roles`,
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + auth0Token() ,
          "cache-control": "no-cache",
        },
      };
      if (subscription.status === "active") {
        options.data = { roles: ["rol_mVtxrBO97gmh9k2i"] }; // ID for "Subscriber" Auth0 Role
      } else if (subscription.status === "canceled") {
        options.data = { roles: ["rol_MmUdJ02CjNL7lFOZ"] }; // ID for "Non-Subscriber" Auth0 Role
      }
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          return response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    });
};

export default cors(webhookHandler as any);
