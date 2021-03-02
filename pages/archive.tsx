import Layout from "../components/Layout";
import WithAuth from "../components/WithAuth";
import Video from "../components/Video";
import SubscribeCTA from "../components/SubscribeCTA";

const Archive = (props) => {
  const loggedIn = props.user;
  const videos = {
    "Randall Productions": [
      "https://www.youtube.com/watch?v=Rcht1SVosxM",
      "https://www.youtube.com/watch?v=sfp-PxAObc0",
      "https://www.youtube.com/watch?v=qh0awAPoYWU",
      "https://www.youtube.com/watch?v=6iP8NMDER1s",
      "https://www.youtube.com/watch?v=Cb6egEegn3o",
      "https://www.youtube.com/watch?v=hF27liWubQ4",
      "https://www.youtube.com/watch?v=ejlFE8qx2X0",
      "https://www.youtube.com/watch?v=j08gcJTs60s",
      "https://www.youtube.com/watch?v=JfbjJZczRnc",
      "https://www.youtube.com/watch?v=88YC4qXDFA4",
      "https://www.youtube.com/watch?v=htWcf69OBts",
      "https://www.youtube.com/watch?v=_pI9C0LsNRY",
      "https://www.youtube.com/watch?v=l17alob1YRk",
      "https://www.youtube.com/watch?v=T-kXBZH_aTg",
      "https://www.youtube.com/watch?v=ISKOC9oAKpw",
      "https://www.youtube.com/watch?v=fhHOGyffaTE",
      "https://www.youtube.com/watch?v=-NJMDiWC1Oc"
    ],
    Comedy: [
      "https://www.youtube.com/watch?v=D0-0e8OT38E",
      "https://www.youtube.com/watch?v=AAeuLKuUqIo",
      "https://www.youtube.com/watch?v=L8OVixkh7vE",
      "https://www.youtube.com/watch?v=S_etDaFcuSg"
    ],
    Music: [
      "https://www.youtube.com/watch?v=hG2fILyMlGg"
    ]
  };
  let isSubscribed = false;
  isSubscribed = props.user.permissions.includes("access:stream");
  if (isSubscribed) return (
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
   else return (
    <Layout title="Video Archive | Ghostlight Playhouse" loggedIn={loggedIn}>
      <h1>Video Archive</h1>
      
        <p>Once you have an active subscription, you can view past shows here.</p>
        <SubscribeCTA user={props.user} />
      
    </Layout>
  );
};

export default WithAuth(Archive);
