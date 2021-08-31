import {useParams} from 'react-router-dom';
import {useQuery, gql} from '@apollo/client';

import Track from './Track';

function Artist() {

  let {id} = useParams();
  let backgroundUrl = '/images/artist/' + id + '.png';
  //console.log('requested artist id: ' + id);

  const ARTIST_QUERY = gql `
    {
      artist(id:${id}){
      name
      albums {
        title
      }
    }
    }
  `;

  const {data} = useQuery(ARTIST_QUERY);
  //console.log(data);

  return <div className="artist">

    <img className="bg" src={backgroundUrl} alt="background"/>

    <div className="save">Save to My stars</div>
    <h1>{data && data.artist.name}</h1>

    <div className="tracks">{data && data.artist.albums.map((track) => <Track key={track.id} track={track}/>)}</div>
  </div>

}
export default Artist;
