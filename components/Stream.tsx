const Stream = () => {
  return (
    <figure>
      <div id='wowza_player'></div>
      <script id='player_embed' src='https://player.cloud.wowza.com/hosted/rjrbb1t0/wowza.js' type='text/javascript'></script>
      <div className="arena-chat" data-publisher="ghostlight-playhouse" data-chatroom="ghostlight-playhouse-global" data-position="aside"></div><script async src="https://go.arena.im/public/js/arenachatlib.js?p=ghostlight-playhouse&e=ghostlight-playhouse-global"></script>
    </figure>
  );
};

export default Stream;
