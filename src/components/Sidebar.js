import { useQuery, useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';


import Button from './Button';
import PlaylistLink from './PlaylistLink';
import '../styles/sidebar.scss';

function Sidebar() {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const history = useHistory();

  const USER_PLAYLISTS_QUERY = gql `
    query getUserPlaylists {
      user(name:"test"){
      playlists {
        id
        title
      }
    }
    }
  `;

  const CREATE_PLAYLIST_MUTATION = gql `
    mutation {
      createPlaylist(title: "80s") {
        id
      }
    }
  `;

  const [createPlaylist] = useMutation(CREATE_PLAYLIST_MUTATION, {
    onCompleted: (result) => {
      console.log('completed');
      console.log(result);
      history.push('/playlists/' + result.createPlaylist.id);
    }
  });


  const { data } = useQuery(USER_PLAYLISTS_QUERY, { skip: !authToken });
  const playlists = data && data.user && data.user.playlists;
  //const playlists = [{id: 0, title: 'UPlabs focus'}, {id: 1, title: 'Golden 80s'}]; TEMP

  return <div className='sidebar'>
    <img className="logo" src='/logo.png' srcSet='/logo2x.png 2x' alt="logo"/>
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

    <h2>Playlists
      { authToken && <Button title="Create playlist" icon="add" onClick={createPlaylist}/>}
    </h2>

    <div className="sidebar__menu">
      {playlists && playlists.map((playlist) => <PlaylistLink key={playlist.id} playlist={playlist}></PlaylistLink>)}
    </div>

  </div>;
}
export default Sidebar;