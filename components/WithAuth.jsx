import React, { Component } from 'react';

import auth0 from '../utils/auth0';
import { fetchUser } from '../lib/user';
import createLoginUrl from '../lib/url-helper';
import RedirectToLogin from '../components/LoginRedirect';

import jwt from 'jsonwebtoken'

export default function withAuth(InnerComponent) {
  return class Authenticated extends Component {
    static async getInitialProps(ctx) {
      if (!ctx.req) {
        const user = await fetchUser();
        return {
          user
        };
      }

      const session = await auth0.getSession(ctx.req);
      if (!session || !session.user) {
        ctx.res.writeHead(302, {
          Location: createLoginUrl(ctx.req.url)
        });
        ctx.res.end();
        return;
      }
      const jwtOptions = {
        algorithms: ["RS256"],

      }
      const signingCert = process.env.AUTH0_SIGNING_CERT_B64
      const processedCert = Buffer.from(signingCert, 'base64').toString();
      const decodedToken = jwt.verify(session.accessToken, processedCert, jwtOptions)
      const permissions = decodedToken.permissions
      const isSubscriber = permissions.includes('access:stream')
      return { user: session.user };
    }

    constructor(props) {
      super(props);
    }

    render() {
      if (!this.props.user) {
        return <RedirectToLogin />;
      }

      return <div>{<InnerComponent {...this.props} user={this.props.user} />}</div>;
    }
  };
}