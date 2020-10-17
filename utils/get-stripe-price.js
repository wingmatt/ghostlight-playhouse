import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
});

export default async function fetchPriceFromStripe(priceId) {
  const stripePriceResponse =  await stripe.prices.retrieve(priceId)
  .then((response) => {
    let priceObject = {
      sku: response.id,
      name: response.name,
      price: response.price,
      currency: response.currency,
      type: response.type
    }
    return stripePriceResponse;
  });
}

export default async function fetchStripePrices() {
  const stripePrices =  await stripe.prices.list()
  .then((response) => {
    let priceObject = {
      sku: response.id,
      name: response.name,
      price: response.price,
      currency: response.currency,
      type: response.type
    }
    return stripePriceResponse;
  });
}