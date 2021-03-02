import Layout from "../components/Layout";
import WithAuth from "../components/WithAuth";
import Video from "../components/Video";

const Archive = (props) => {
  const loggedIn = props.user;
  const videos = {
    Rickrolls: [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    ]
  };

  return (
    <Layout title="Video Archive | Ghostlight Playhouse" loggedIn={loggedIn}>
      <h1>Video Archive</h1>
      
        {Object.keys(videos).map((category, index) => (
          <>
            <h2>{category}</h2>
            <ul className="video-list">
              {videos[category].map((videoUrl, index) => (
                <li key={index}><Video videoUrl={videoUrl}/></li>
              ))}
            </ul>
          </>
        ))}
      
    </Layout>
  );
};

export default WithAuth(Archive);
