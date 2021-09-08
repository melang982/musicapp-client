import {useQuery, gql} from '@apollo/client';
import {Link} from 'react-router-dom';

function Sidebar() {

  const id = 1;//TEMP
  const PLAYLISTS_QUERY = gql `
    {
      user(id:${id}){
      playlists {
        id
        title
      }
    }
    }
  `;

    const {data} = useQuery(PLAYLISTS_QUERY);
    const playlists = data && data.user.playlists;
  //const playlists = [{id: 0, title: 'UPlabs focus'}, {id: 1, title: 'Golden 80s'}]; //TEMP

  return <div className='sidebar'>
    <img className="logo" src='/logo.png' alt="logo"/>
    <h2>Music</h2>
    <div className="sidebar__menu">
      <Link to={'/artist/2'}>Discover</Link>
      <Link to={'/artist/2'}>Rising</Link>
      <Link to={'/artist/2'}>Inspiration</Link>
      <Link to={'/artist/2'}>My stars</Link>
    </div>

    <div className="sidebar__menu">
      <Link to={'/artist/2'}>Songs</Link>
      <Link to={'/artist/2'}>Artists</Link>
      <Link to={'/artist/2'}>Albums</Link>
      <Link to={'/artist/2'}>Radio</Link>
    </div>

    <h2>Playlists</h2>
    <div className="sidebar__menu">
      {playlists && playlists.map((playlist) => <Link to={'/playlists/' + playlist.id } key={playlist.id}>{playlist.title}</Link>)}
    </div>

  </div>;
}
export default Sidebar;
