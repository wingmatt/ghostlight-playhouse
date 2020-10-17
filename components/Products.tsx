import products from '../data/products.json'
import prices from '../data/prices.json'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import fetchPriceFromStripe from '../utils/get-stripe-price'

const Products = () => {
  const { addItem, removeItem } = useShoppingCart()

  return (
    <section className="products">
      {prices.map((product) => (
        <div key={product.sku} className="product">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p className="price">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}{product.recurring? "/month" : ""}
          </p>
          <button
            className="cart-style-background"
            onClick={() => addItem(product)}
          >
            Add to cart
          </button>
          <button
            className="cart-style-background"
            onClick={() => removeItem(product.sku)}
          >
            Remove
          </button>
        </div>
      ))}
    </section>
  )
}

export default Products

export async function getStaticProps() {
  let priceData = [];
  prices.map((price) => {
    priceData.push(fetchPriceFromStripe(price));
  })

  return {
    props: {
      priceData
    },
    revalidate: 10
  }
}