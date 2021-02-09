import Layout from "../components/Layout";
import WithAuth from "../components/WithAuth";
import Video from "../components/Video";

const Archive = (props) => {
  const loggedIn = props.user;
  const videoUrls = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  ];
  return (
    <Layout title="Video Archive | Ghostlight Playhouse" loggedIn={loggedIn}>
      <h1>Video Archive</h1>
      <ul className="video-list">
        {videoUrls.map((videoUrl, index) => (
          <li key={index}><Video videoUrl={videoUrl}/></li>
        ))}
      </ul>
    </Layout>
  );
};

export default WithAuth(Archive);
