import CheckAuth from "../components/CheckAuth";
import Layout from "../components/Layout";

const Profile = (props) => {
  const loggedIn = props.user;
  const stripeCustomer = loggedIn ? props.user.stripe_customer : null;
  let subscriptionStatus = "You are not subscribed.";
  if (
    props.user.permissions &&
    props.user.permissions.includes("access:stream")
  ) {
    subscriptionStatus = "Your subscription is active!";
  }

  return (
    <Layout title="Account Details | Ghostlight Playhouse" loggedIn={loggedIn}>
      <h1>Account Details</h1>
      <p>{subscriptionStatus}</p>
      <a href={"/api/billing/" + stripeCustomer}>Manage Billing</a>
    </Layout>
  );
};

export default CheckAuth(Profile);
