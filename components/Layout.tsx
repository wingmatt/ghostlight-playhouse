import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { UserProvider } from '../lib/user';

type Props = {
  user: string
  loading: boolean
  children: ReactNode
  title?: string
}

const Layout = ({
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
        <div className="header-content">
          <a href="/" className="logo">
            <img src="/logo.png" />
          </a>
          <h1>
            Ghostlight Playhouse
          </h1>
        </div>
        <nav>
        {user
        ? <Link href="/api/logout"><a>Logout</a></Link>
        : <Link href="/api/login"><a>Login</a></Link>
        }
        <a href="/watch">Watch</a>
        </nav>
      </header>
      {children}
    </div>
  </UserProvider>
)

export default Layout
