import {useParams} from 'react-router-dom';
import {useQuery, gql} from '@apollo/client';

import Player from './Player';

function Playlist({playlist}) {

  const {id} = useParams();

  const PLAYLIST_QUERY = gql `
    {
      playlist(id:${id}){
      title
      tracks {
        id
        title
        artist
        album {
          id
          title
        }
        duration
      }
    }
    }
  `;

  const {data} = useQuery(PLAYLIST_QUERY);
  console.log(data);

  const tracks = data && data.playlist.tracks;
  console.log(tracks);


  return <div className="playlist">
    <h1>My playlist</h1>

    {tracks && tracks.map((track) => <div key={track.id}>{track.title}</div>)}

    <Player trackList={tracks}/>
  </div>;
}
export default Playlist;
