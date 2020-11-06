import React, { Component } from 'react';

import auth0 from '../utils/auth0';
import { fetchUser } from '../lib/user';
import createLoginUrl from '../lib/url-helper';
import RedirectToLogin from '../components/LoginRedirect';

import jwt from 'jsonwebtoken'

export default function WithAuth(InnerComponent) {
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
      const certBase64 = process.env.AUTH0_SIGNING_CERT_B64
      const certDecoded = Buffer.from(certBase64, 'base64').toString();
      const token = jwt.verify(session.accessToken, certDecoded, { algorithms: ["RS256"] })
      const userData = {
        id: session.user.sub,
        email: session.user.name,
        permissions: token.permissions
      }
      return { user: userData };
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