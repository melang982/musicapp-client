import { useQuery, useMutation, gql, useReactiveVar } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { userVar } from '../cache';

import Button from './Button';
import PlaylistLink from './PlaylistLink';
import '../styles/sidebar.scss';

const USER_PLAYLISTS_QUERY = gql `
  query getUserPlaylists {
    user {
      id
      playlists {
        id
        title
      }
    }
  }
`;

const CREATE_PLAYLIST_MUTATION = gql `
  mutation {
    createPlaylist {
      id
    }
  }
`;

function Sidebar() {
  const user = useReactiveVar(userVar);
  //console.log(user.name);
  const history = useHistory();

  const [createPlaylist] = useMutation(CREATE_PLAYLIST_MUTATION, {
    onCompleted: (result) => {
      //console.log('completed');
      //console.log(result);
      history.push('/playlists/' + result.createPlaylist.id);
    },
    refetchQueries: () => ['getUserPlaylists']
  });

  //console.log('check if should do query:');
  //console.log(!(user.name == null));
  const { data } = useQuery(USER_PLAYLISTS_QUERY, { skip: !user.name });
  const playlists = data && data.user && data.user.playlists;
  //const playlists = [{id: 0, title: 'UPlabs focus'}, {id: 1, title: 'Golden 80s'}]; TEMP

  return <div className='sidebar'>
    <Link to={'/'}><img className="logo" src='/logo.png' srcSet='/logo2x.png 2x' alt="logo"/></Link>
    <h2>Music</h2>
    <div className="sidebar__menu">
      <Link to={'/'}>Playlists</Link>
      <Link to={'/stars'}>My stars</Link>
    </div>

    <div className="sidebar__menu">
      <Link to={'/artist/3'}>Tycho</Link>
      <Link to={'/artist/1'}>Katy Perry</Link>
      <Link to={'/artist/2'}>Gorillaz</Link>
    </div>

    <h2>Playlists
      { user.name && <Button title="Create playlist" icon="add" onClick={createPlaylist}/>}
    </h2>

    <div className="sidebar__menu">
      {playlists && playlists.map((playlist) => <PlaylistLink key={playlist.id} playlist={playlist}></PlaylistLink>)}
    </div>

  </div>;
}
export default Sidebar;