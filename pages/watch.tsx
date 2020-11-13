import { NextPage, GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import SubscribeCTA from '../components/SubscribeCTA';
import Stream from '../components/Stream'
import WithAuth from '../components/WithAuth';


const WatchPage: NextPage = (props) => {
  const loggedIn = (props.user)
  const isSubscribed = props.user.permissions.includes('access:stream')

    if (isSubscribed) {
      return(
        <Layout title="Watch Live Local Talent | Ghostlight Playhouse" user={props.user} loggedIn={loggedIn}>
          <h1>Watch Live Local Talent</h1>
          <Stream/>
        </Layout>
      )
    } else {
      return(
        <Layout title="Start Watching Live Local Talent | Ghostlight Playhouse" user={props.user} loggedIn={loggedIn}>
          <h1>Start Watching Live Local Talent</h1>
          <SubscribeCTA user={props.user}/>
        </Layout>
      )
    }
}

export default WithAuth(WatchPage)