import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

const Products = (props) => {
  const { addItem, removeItem } = useShoppingCart()

  return (
    <section className="products">
      {props.priceData.map((product) => (
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
            Remove all
          </button>
        </div>
      ))}
    </section>
  )
}

export default Products

