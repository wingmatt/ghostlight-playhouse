import ReactPlayer from 'react-player'

const Video = (props) => {
 const videoUrl = props.videoUrl;
 return (
   <ReactPlayer url={videoUrl} controls width="500px" height="282px" />
 )
}

export default Video;