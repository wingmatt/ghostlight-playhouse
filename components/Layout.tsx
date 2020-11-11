import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { UserProvider } from '../lib/user';
import NavAccount from './NavAccount';

type Props = {
  user: string
  loading: boolean
  children: ReactNode
  title?: string
}

const Layout = ({
  loggedIn,
  user, 
  loading=false,
  children,
  title = 'Ghostlight Playhouse',
}: Props) => (
  <UserProvider value={{ user, loading }}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="container">
      <header>
        <a href="/" className="logo">
          <img src="/logo.png" />
        </a>
        <nav>
          <NavAccount user={loggedIn}/>
        &nbsp;|&nbsp;<a href="/watch">Watch</a>
        </nav>
      </header>
      {children}
    </div>
  </UserProvider>
)

export default Layout
