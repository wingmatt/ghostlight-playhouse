import ReactPlayer from 'react-player'

const Video = (props) => {
 const videoUrl = props.videoUrl;
 return (
   <ReactPlayer url={videoUrl} />
 )
}

export default Video;