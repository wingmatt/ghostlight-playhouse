import Head from "next/head";

const SubscribeCTA = (props) => {
  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const urlRoot = document.location.origin;
    await fetch(`${urlRoot}/api/checkout_sessions/subscribe`, {
      method: "post",
      body: JSON.stringify({
        customer: props.user.stripe_customer,
        email: props.user.email,
      }),
    }).then(async (sessionId) => {
      console.log(sessionId);
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId.data
      });
    });
  };

  return (
    <form onSubmit={handleCheckout}>
      <Head>
        <script src="https://js.stripe.com/v3/" key="stripe"></script>
      </Head>
      <button type="submit">Sign Up and Start Watching</button>
    </form>
  );
};

export default SubscribeCTA;
