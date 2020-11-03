import axios, { AxiosRequestConfig } from "axios";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02",
}); 

const getAuth0Token = async function getAuth0Token() {
  const options: AxiosRequestConfig = { method: 'POST',
  url: `https://wingmatt.us.auth0.com/oauth/token`,
  headers: { 'content-type': 'application/json' },
  data:
   { audience: `${process.env.AUTH0_MGMT_API_URL}/`,
     client_id: process.env.AUTH0_CLIENT_ID,
     client_secret: process.env.AUTH0_CLIENT_SECRET,
     grant_type: 'client_credentials' }
   };
   return await axios(options).then ((response) => {
    return response.data.access_token;
   }).catch((error) => {
    console.log(error);
   })
};

const auth0Token = Promise.resolve(getAuth0Token());

const Auth0UserFromEmail = async function Auth0UserFromEmail(
  customer: Stripe.Customer
): Promise<string> {
  let user = "";
  var options: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.AUTH0_MGMT_API_URL}/users-by-email`,
    params: { email: customer.email },
    headers: { authorization: "Bearer " + auth0Token},
  };
  return await axios
    .request(options)
    .then(async function (response) {
      if (response.data[0].user_id) {
        user = response.data[0].user_id;
      } else {
        user = await createAuth0User(customer);
      }
      
      return await user;
    })
    .catch(async function (error) {
      console.error(error);
      return error;
    });
};

const updateSubscription = async function updateSubscription(
  subscription: Stripe.Subscription
) {
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
          authorization: "Bearer " + auth0Token ,
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
      authorization: "Bearer " + auth0Token ,
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