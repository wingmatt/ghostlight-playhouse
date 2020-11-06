import { NextPage, GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user';
import WithAuth from '../components/WithAuth';

const WatchPage: NextPage = (props) => {

  return (
    <Layout user={props.user}>
      <h1>Livestream</h1>


        <>
          <div id='wowza_player'></div>
          <script id='player_embed' src='https//player.cloud.wowza.com/hosted/rjrbb1t0/wowza.js' type='text/javascript'></script>
        </>
    </Layout>
  )
}

export default WithAuth(WatchPage)