import { NextPage } from 'next'
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user';
import withAuth from '../components/withAuth';

const WatchPage: NextPage = () => {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading}>
      <h1>Protected Page</h1>

      {loading && <p>Loading profile...</p>}

      {!loading && user && (
        <>
          <p>Profile:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </Layout>
  )
}

export default withAuth(WatchPage)