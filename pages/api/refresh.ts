import axios, { AxiosRequestConfig } from "axios";

const refreshAuth0Token = async () => {
  // Get current token from request
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.AUTH0_OAUTH_DOMAIN}/oauth/token`,
    data: {
      audience: `${process.env.AUTH0_MGMT_API_URL}/`,
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      grant_type: "refresh_token",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
