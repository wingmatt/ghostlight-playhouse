import {GetServerSideProps} from 'next'
import Layout from '../components/Layout';
import WithAuth from '../components/WithAuth';
import { useFetchUser } from '../lib/user';

const Profile = ({ props }) => {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={props}>
    <h1>Account Details</h1>

    <div>
      <h3>Profile (server rendered)</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  </Layout>
  )
  
  };

export default WithAuth(Profile);