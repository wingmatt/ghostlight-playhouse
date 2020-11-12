import { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import CheckAuth from '../components/CheckAuth'

const IndexPage: NextPage = (props) => {
  const loggedIn = (props.user)
  return (
    <Layout title="Home | Next.js + TypeScript Example" loggedIn={loggedIn}>

      <ul className="card-list">
        <li>
            <a className="card elements-style-background" href="/watch">
              <h2 className="bottom">Watch Stream</h2>
            </a>
        </li>
        <li>
          <Link href="/full-menu">
            <a className="card cart-style-background">
              <h2 className="bottom">Point of Sale</h2>
            </a>
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

export default CheckAuth(IndexPage)
