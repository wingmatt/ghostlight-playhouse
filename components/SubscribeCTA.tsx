import Head from 'next/head'

const SubscribeCTA = (props) => {

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    
    const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const urlRoot = document.location.origin;
    const {error} = await stripe.redirectToCheckout({
      clientReferenceId: props.user.stripe_customer,
      lineItems: [
        {price: 'price_1HnBPzAlSgPwIalWb8KjnY5c', quantity: 1},
      ],
      mode: 'subscription',
      successUrl: `${urlRoot}/?refresh`,
      cancelUrl: `${urlRoot}/`,
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
