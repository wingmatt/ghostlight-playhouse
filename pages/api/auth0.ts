import axios, { AxiosRequestConfig } from "axios";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02",
});

const auth0Token = function auth0Token() {
  // For testing, we return a pre-built token.
  // TODO: Generate dynamic token request and return that instead.
  return process.env.AUTH0_MGMT_API_TOKEN;
};

const Auth0UserFromEmail = async function Auth0UserFromEmail(
  customer: Stripe.Customer
): Promise<string> {
  let user = "";
  var options: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.AUTH0_MGMT_API_URL}/users-by-email`,
    params: { email: customer.email },
    headers: { authorization: "Bearer " + auth0Token() },
  };
  return await axios
    .request(options)
    .then(function (response) {
      user = response.data[0].user_id;
      return user;
    })
    .catch(async function (error) {
      console.error(error);
      const newUserId = await createAuth0User(customer)
      return Promise.resolve(newUserId);
    });
};

const updateSubscription = async function updateSubscription(
  subscription: Stripe.Subscription
) {
  // Get Auth0 ID that matches sub customer's email address
  let Auth0User = "";
  return await stripe.customers
    .retrieve(subscription.customer)
    .then(async (customer) => {
      return await Auth0UserFromEmail(customer);
    })
    .then((auth0User) => {
      const options: AxiosRequestConfig = {
        method: "POST",
        url: `${process.env.AUTH0_MGMT_API_URL}/users/${auth0User}/roles`,
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + auth0Token() ,
          "cache-control": "no-cache",
        },
      };
      if (subscription.status === "active") {
        options.data = { roles: ["rol_mVtxrBO97gmh9k2i"] }; // ID for "Subscriber" Auth0 Role
      } else if (subscription.status === "canceled") {
        options.data = { roles: ["rol_MmUdJ02CjNL7lFOZ"] }; // ID for "Non-Subscriber" Auth0 Role
      }
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          return response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    });
};

const createAuth0User = async function createAuth0User(customer: Stripe.Customer): Promise<string> {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.AUTH0_MGMT_API_URL}/users`,
    headers: {
      "content-type": "application/json",
      authorization: "Bearer " + auth0Token() ,
      "cache-control": "no-cache",
    },
    data: {
      "email": customer.email,
      "blocked": false,
      "email_verified": false,
      "user_id": customer.id,
      "connection": "Username-Password-Authentication",
      "password": "ghostlight22!",
      "verify_email": true,
    }
  };
  return await axios
    .request(options)
    .then(function (response) {
      const user = response.data[0].user_id;
      return user;
    })
    .catch(async function (error) {
      console.error(error);
      return "";
    });

}

export default updateSubscription