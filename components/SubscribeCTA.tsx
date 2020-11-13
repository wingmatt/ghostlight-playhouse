import { userInfo } from "os";

const SubscribeCTA = (props) => {

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    
    const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const urlRoot = document.location.origin;
    const {error} = await stripe.redirectToCheckout({
      lineItems: [
        {price: 'price_1HUJmC4YsAsT3IGzoP2yeIHW', quantity: 1},
      ],
      mode: 'subscription',
      successUrl: `${urlRoot}/watch`,
      cancelUrl: `${urlRoot}/`,
      customerEmail: props.user.email
    });
  };

  return (
    <form onSubmit={handleCheckout}>
      <button type="submit">
        Sign Up and Start Watching
      </button>
    </form>
  );
};

export default SubscribeCTA;
