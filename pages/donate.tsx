import { NextPage } from 'next'

import { Elements } from '@stripe/react-stripe-js'
import getStripe from '../utils/get-stripejs'

import Layout from '../components/Layout'
import ElementsForm from '../components/ElementsForm'

const DonatePage: NextPage = () => {
  return (
    <Layout title="Donate Today | Ghostlight Playhouse">
      <div className="page-container">
        <h1>Donate to the Ghostlight Playhouse</h1>
        <p>The Ghostlight Playhouse is an entertainment hub. </p>
        <p>It’s operated by the Randall Theatre Company, a non-profit theatre with over a decade of history in Downtown Medford.</p>
        <p>We provide live entertainment, whether it’s produced by the Randall, or other entertainers. Our job is to make it accessible to you.</p>
        <p>We are so grateful for all of the support from the Southern Oregon community, and we are honored to continue the tradition of the Randall Theatre Company at The Ghostlight Playhouse!</p>
        <hr />
        <Elements stripe={getStripe()}>
          <ElementsForm />
        </Elements>
        <p><b>Nonprofit Tax ID:</b> 35-2239724</p>
      </div>
    </Layout>
  )
}

export default DonatePage
