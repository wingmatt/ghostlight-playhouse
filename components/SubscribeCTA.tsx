import Head from 'next/head'

const SubscribeCTA = (props) => {

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    
    const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const urlRoot = document.location.origin;
    const {error} = await stripe.redirectToCheckout({
      lineItems: [
        {price: 'price_1HnBPzAlSgPwIalWb8KjnY5c', quantity: 1},
      ],
      mode: 'subscription',
      successUrl: `${urlRoot}/watch`,
      cancelUrl: `${urlRoot}/watch`,
      customerEmail: props.user.email
    });
  };

  return (
    <form onSubmit={handleCheckout}>
      <Head>
        <script src="https://js.stripe.com/v3/" key="stripe"></script>
      </Head>
      <button type="submit">
        Sign Up and Start Watching
      </button>
    </form>
  );
};

export default SubscribeCTA;
