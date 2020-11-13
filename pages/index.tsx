import { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import CheckAuth from '../components/CheckAuth'

const IndexPage: NextPage = (props) => {
  const loggedIn = (props.user)
  return (
    <Layout title="Stream Ghostlight Playhouse Events in Medford, Oregon" loggedIn={loggedIn}>
      <h1>Ghostlight Playhouse Stream</h1>
      <ul className="card-list">
        <li>
            <a className="card elements-style-background" href="/watch">
              <h2 className="bottom">Watch Now</h2>
            </a>
        </li>
        <li>
          <Link href="/donate">
            <a className="card cart-style-background">
              <h2 className="bottom">Donate to Ghostlight Playhouse</h2>
            </a>
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

export default CheckAuth(IndexPage)
