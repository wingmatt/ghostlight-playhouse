import { NextPage } from "next";
import Layout from "../components/Layout";
import SubscribeCTA from "../components/SubscribeCTA";
import Stream from "../components/Stream";
import StreamLinks from "../components/StreamLinks";
import CheckAuth from "../components/CheckAuth";

const IndexPage: NextPage = (props) => {
  const loggedIn = props.user;
  let isSubscribed = false;
  if (loggedIn) {
    isSubscribed = props.user.permissions.includes("access:stream");
  }

  if (!loggedIn) {
    return (
      <Layout
        title="Start Watching Live Local Talent | Ghostlight Playhouse"
        loggedIn={loggedIn}
      >
        <h1>Start Watching Live Local Talent</h1>
        <ol>
          <li><a href="/api/login">Create a Ghostlight account here.</a></li>
          <li>Come back to this page and add a subscription to your account.</li>
          <li>Enjoy the show!</li>
        </ol>
      </Layout>
    );
  } else if (isSubscribed) {
    return (
      <Layout
        title="Watch Live Local Talent | Ghostlight Playhouse"
        user={props.user}
        loggedIn={loggedIn}
      >
        <h1>Watch Live Local Talent</h1>
        <Stream />
        <StreamLinks />
      </Layout>
    );
  } else {
    return (
      <Layout
        title="Start Watching Live Local Talent | Ghostlight Playhouse"
        user={props.user}
        loggedIn={loggedIn}
      >
        <h1>Start Watching Live Local Talent</h1>
        <SubscribeCTA user={props.user} />
      </Layout>
    );
  }
};

export default CheckAuth(IndexPage);
