import React, { Component } from 'react';

import auth0 from '../utils/auth0';
import { fetchUser } from '../lib/user';
import createLoginUrl from '../lib/url-helper';
import { maybeRefreshAuth0Token}  from '../pages/api/auth0'

import jwt from 'jsonwebtoken'

export default function CheckAuth(InnerComponent) {
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
        return { user: null };
      }

      return await maybeRefreshAuth0Token(session, ctx.query).then((accessToken)=>{
        const certBase64 = process.env.AUTH0_SIGNING_CERT_B64
        const certDecoded = Buffer.from(certBase64, 'base64').toString();
        const token = jwt.verify(accessToken, certDecoded, { algorithms: ["RS256"] })
        const userData = {
          id: session.user.sub,
          email: session.user.name,
          permissions: token.permissions
        }
        return { user: userData };
      })
    }

    constructor(props) {
      super(props);
    }

    render() {
      return <div>{<InnerComponent {...this.props} user={this.props.user} />}</div>;
    }
  };
}