import { NextPage, GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import SubscribeCTA from '../components/SubscribeCTA';
import WithAuth from '../components/WithAuth';

const WatchPage: NextPage = (props) => {
  const loggedIn = (props.user)
  const isSubscribed = props.user.permissions.includes('access:stream')

    if (isSubscribed) {
      return(
        <Layout user={props.user} loggedIn={loggedIn}>
          <h1>Livestream</h1>
          <>
            <div id='wowza_player'></div>
            <script id='player_embed' src='https://player.cloud.wowza.com/hosted/rjrbb1t0/wowza.js' type='text/javascript'></script>
          </>
        </Layout>
      )
    } else {
      return(
        <Layout user={props.user} loggedIn={loggedIn}>
          <h1>Start Watching Live Local Talent</h1>
          <SubscribeCTA/>
        </Layout>
      )
    }
}

export default WithAuth(WatchPage)