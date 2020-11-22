import Stripe from "stripe";

const getStripeCustomerPortal = async (stripeCustomerId) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-03-02",
  });

  return await stripe.billingPortal.sessions
    .create({
      customer: "cus_IRKnT1ZtkZVUN8",
      return_url: "https://watch.ghostlightplayhouse.com/?refresh",
    })
    .then((response) => {
      return response.url;
    })
    .catch((error) => {
      console.log(error)
    });
};

export default getStripeCustomerPortal;
