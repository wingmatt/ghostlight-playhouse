import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">

      <ul className="card-list">
        <li>
            <a className="card elements-style-background" href="/watch">
              <h2 className="bottom">Watch Stream</h2>
            </a>
        </li>
        <li>
          <Link href="/use-shopping-cart">
            <a className="card cart-style-background">
              <h2 className="bottom">Point of Sale</h2>
            </a>
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

export default IndexPage
