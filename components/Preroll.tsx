const Preroll = () => {
  return (
    <figure id="preroll">
      <video width="640" height="360" loop controls controlsList="nodownload" >
      <source src="https://ghostlight-video.s3-us-west-2.amazonaws.com/GLP-Pre-Roll-V2-210108.mp4" type="video/mp4" />
    </video>
      <div className="arena-chat" data-publisher="ghostlight-playhouse" data-chatroom="ghostlight-playhouse-global" data-position="aside"></div><script async src="https://go.arena.im/public/js/arenachatlib.js?p=ghostlight-playhouse&e=ghostlight-playhouse-global"></script>
    </figure>
  );
};

export default Preroll;
