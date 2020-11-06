import { NextPage, GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user';
import withAuth from '../components/withAuth';

const WatchPage: NextPage = (props) => {

  return (
    <Layout user={props.user}>
      <h1>Protected Page</h1>


        <>
          <p>Profile:</p>
          <pre>{JSON.stringify(props.user, null, 2)}</pre>
        </>
    </Layout>
  )
}

export default withAuth(WatchPage)