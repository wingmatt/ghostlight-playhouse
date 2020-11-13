import { useState } from "react";
import { CartDetails, useShoppingCart } from "use-shopping-cart";
import { fetchPostJSON } from "../utils/api-helpers";
import Cart from "./Cart";

const SubscribeCTA = (props) => {
  const [loading, setLoading] = useState(false);

  const { cartDetails, redirectToCheckout } = useShoppingCart();

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setLoading(true);

    const subscriptionObj: CartDetails = {
      price_1HUJmC4YsAsT3IGzoP2yeIHW: {
        name: "Ghostlight Playhouse Subscription",
        description: "Support local arts and theatre from your living room",
        sku: "price_1HUJmC4YsAsT3IGzoP2yeIHW",
        price: 1000,
        image:
          "https://files.stripe.com/links/fl_test_ENSmYCRJeCmYBRgUHdk26jvU",
        currency: "usd",
        type: "recurring",
        recurring: { interval: "month", interval_count: 1 },
        quantity: 1,
        value: 1000,
        formattedValue: "$10.00",
      },
    };

    const response = await fetchPostJSON("/api/checkout_sessions/cart", subscriptionObj);

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    redirectToCheckout({ sessionId: response.id });
  };

  return (
    <Cart>
      <form onSubmit={handleCheckout}>
        <button type="submit" disabled={loading}>
          Sign Up and Start Watching
        </button>
      </form>
    </Cart>
  );
};

export default SubscribeCTA;
