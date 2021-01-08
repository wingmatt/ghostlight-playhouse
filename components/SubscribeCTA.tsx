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
      body: props.user.stripe_customer,
      headers: {
        Accept: "application/json",
      },
    }).then(async (response) => {
      await response.text().then(async (sessionId) => {
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });
      });
    });
  };

  return (
    <form onSubmit={handleCheckout}>
      <Head>
        <script src="https://js.stripe.com/v3/" key="stripe"></script>
      </Head>
      <button type="submit">
        Join the Best Seat Club to watch now!
      </button>
    </form>
  );
};

export default SubscribeCTA;
