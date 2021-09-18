import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import PlaylistImage from '../components/PlaylistImage';

const MAIN_QUERY = gql `
  query MainQuery {
    playlists(filter: "mood") {
      id
      title
    }

  }
`;

function Main() {

  const { data } = useQuery(MAIN_QUERY);
  console.log(data);

  return <div className="main">
    <h1>Top playlists</h1>
    <div className="main__grid">
    { data && data.playlists.map((playlist) =>
      <Link to={'/playlists/' + playlist.id} key={playlist.id} className="main__playlist">
        <PlaylistImage id={playlist.id}/>
        <h3>{ playlist.title }</h3>
      </Link>) }
    </div>
  </div>;
}
export default Main;