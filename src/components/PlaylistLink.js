import {Link} from 'react-router-dom';

function PlaylistLink({playlist}) {

  return <div className='playlist-link'>
    <div className="playlist-link__tag"/>
    <Link to={'/playlists/' + playlist.id}>{playlist.title}</Link>
  </div>
}

export default PlaylistLink;
