import auth0 from '../../lib/auth0';
import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'

export default auth0.requireAuthentication(async function billingInfo(req, res) {
  const { user } = await auth0.getSession(req);
  res.json({
    email: user.email,
    country: 'United States',
    paymentMethod: 'Paypal'
  });
});