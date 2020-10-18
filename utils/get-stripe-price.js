import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
});

export function getStripeProducts (stripePrices) {
  let productsToGet = new Set()
  stripePrices.data.map((price) => {
    productsToGet.add(price.product)
  })
  
  const stripeProducts = await stripe.products.list({ids: [...productsToGet]})

  let formattedProducts = {}
  stripeProducts.data.map((product) => {
    formattedProducts[product.id] = {
      name: product.name,
      description = product.description,
      image: product.images[0]
    }
  })
  
  return formattedProducts
}

/*
@params :
stripePrices: Raw price data from stripe prices list --active
stripeProducts: result of getStripeProductData. Object where keys are the product ID.
*/
export default function formatStripeData () {
  const stripePrices = stripe.prices.list({active: true})
  const stripeProducts = getStripeProducts(stripePrices)
  let formattedStripeData = [];

  stripePrices.data.map((price) => {
    let product = stripeProducts[price.product]
    let formattedPrice = {
      name: product.name,
      description: product.description,
      sku: price.id,
      price: price.unit_amount,
      image: product.image,
      currency: price.currency,
      type: price.type,
      recurring: null
    }
    if (product.type == 'recurring') {
      formattedPrice.recurring = {
        interval: price.recurring.interval,
        interval_count: price.recurring.interval_count
      }
    }

    formattedStripeData.push(formattedPrice)
  })

  return formattedStripeData
}
