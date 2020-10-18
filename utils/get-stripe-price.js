import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

const formatStripeProducts = function (stripeProducts) {
  let formattedProducts = {}
  stripeProducts.data.map((product) => {
    formattedProducts[product.id] = {
      name: product.name,
      description: product.description,
      image: product.images[0],
    };
  });

  return formattedProducts;
}

export default async function formatStripeData() {
  const stripePrices = await stripe.prices.list({ active: true })
  const stripeProducts = await stripe.products.list()

  Promise.all([stripePrices,stripeProducts]).then(async (prices) => {
    const formattedProducts = formatStripeProducts(stripeProducts)
    let formattedStripeData = [];

    stripePrices.data.map((price) => {
      let product = formattedProducts[price.product];
      let formattedPrice = {
        name: product.name,
        description: product.description,
        sku: price.id,
        price: price.unit_amount,
        image: product.image,
        currency: price.currency,
        type: price.type,
        recurring: null,
      };
      if (price.type == "recurring") {
        formattedPrice.recurring = {
          interval: price.recurring.interval,
          interval_count: price.recurring.interval_count,
        };
      }

      formattedStripeData.push(formattedPrice);
    });

    return formattedStripeData;
  })
}
