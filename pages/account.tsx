import React from 'react';

import Layout from '../components/Layout';
import WithAuth from '../components/WithAuth';

const Profile = ({ user }) => (
  <Layout user={user}>
    <h1>Account Details</h1>

    <div>
      <h3>Profile (server rendered)</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  </Layout>
);

export default WithAuth(Profile);