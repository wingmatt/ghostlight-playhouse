import Stripe from "stripe";

const getStripeCustomerPortal = async (stripeCustomerId) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_LIVE, {
    apiVersion: "2020-03-02",
  });

  return await stripe.billingPortal.sessions
    .create({
      customer: stripeCustomerId,
      return_url: "https://watch.ghostlightplayhouse.com/account",
    })
    .then((response) => {
      return response.url;
    })
    .catch((error) => {
      console.log(error)
    });
};

export default getStripeCustomerPortal;
