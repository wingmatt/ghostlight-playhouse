import Layout from "../components/Layout";
import WithAuth from "../components/WithAuth";

const Profile = (props) => {
  return (
    <Layout user={props}>
      <h1>Account Details</h1>
      Redirecting to your customer portal...
      <a href={"/api/billing/"+props.user.stripe_customer}>Manage Billing</a>
    </Layout>
  );
};

export default WithAuth(Profile);
